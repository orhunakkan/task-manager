import express from 'express';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Database connection configuration
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'task-manager',
  password: '4284',
  port: 5432,
};

// Create a new pool using the configuration
const pool = new pg.Pool(dbConfig);

// Add connection error handler
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize database
async function initDb() {
  let client;
  try {
    client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1); // Exit if database initialization fails
  } finally {
    if (client) client.release();
  }
}

// Validate task data
function validateTask(task) {
  const errors = [];
  
  if (!task.title) {
    errors.push('Title is required');
  } else if (task.title.length > 255) {
    errors.push('Title must be less than 255 characters');
  }
  
  // Validate date format if provided
  if (task.dueDate && isNaN(new Date(task.dueDate).getTime())) {
    errors.push('Invalid date format');
  }
  
  return errors;
}

// POST endpoint to create a task
app.post('/api/tasks', async (req, res) => {
  let client;
  try {
    const { title, description, dueDate } = req.body;
    
    // Validate input
    const errors = validateTask({ title, description, dueDate });
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }
    
    client = await pool.connect();
    const result = await client.query(
      'INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *',
      [title, description || null, dueDate || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (client) client.release();
  }
});

// GET endpoint to fetch all tasks
app.get('/api/tasks', async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT * FROM tasks ORDER BY created_at DESC');
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (client) client.release();
  }
});

// Serve the HTML files
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'home.html'));
});

app.get('/new-task', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'new-task.html'));
});

// Start server
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});
