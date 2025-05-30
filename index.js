import express from 'express';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 3000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Database connection
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task-manager',
  password: '4284', // Update this with your actual password
  port: 5432,
});

// Initialize database
async function initDb() {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    client.release();
    console.log('Database initialized');
  } catch (err) {
    console.error('Error initializing database', err);
  }
}

// POST endpoint to create a task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *',
      [title, description, dueDate]
    );
    client.release();
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating task', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to fetch all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tasks ORDER BY created_at DESC');
    client.release();
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Start server
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
