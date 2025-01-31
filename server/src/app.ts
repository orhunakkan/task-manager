import express, { Express, Request, Response } from 'express';
import connectDB from './config/database';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './config/swagger';

// Routes
import taskRoutes from './routes/tasks';
import authRoutes from './routes/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// Configure CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.json());

// Swagger Documentation
const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes first
app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);

// Static files after routes
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
connectDB();

// Catch-all handler last
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

let server: ReturnType<typeof app.listen>;

// Only start the server if we're not in test mode
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export { app, server };
