import express, { Express, Request, Response } from 'express';
import connectDB from './config/database';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import taskRoutes from './routes/tasks';
import authRoutes from './routes/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);

// Catch-all handler for React's index.html
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;