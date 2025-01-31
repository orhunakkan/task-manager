import express, { Express, Request, Response } from 'express';
import connectDB from './config/database';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './config/swagger';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import logger from './config/logger';
import http from 'http';
import WebSocketService from './services/websocket';

// Routes
import taskRoutes from './routes/tasks';
import authRoutes from './routes/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// Request logging middleware should be first
app.use(requestLogger);

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

// Error handling middleware should be last
app.use(errorHandler);

// Create HTTP server
const httpServer = http.createServer(app);

// Initialize WebSocket service only in non-test environment
export const wsService =
  process.env.NODE_ENV !== 'test'
    ? new WebSocketService(httpServer)
    : new WebSocketService(null as any); // Pass null for test environment

let server: ReturnType<typeof httpServer.listen>;

// Only start the server if we're not in test mode
if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
}

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

export { app, httpServer as server };
