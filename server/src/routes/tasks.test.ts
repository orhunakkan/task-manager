import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import taskRoutes from './tasks';
import { Task } from '../models/task';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';

let mongoServer: MongoMemoryServer;
const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Task Routes', () => {
  const userId = new mongoose.Types.ObjectId().toString();
  const token = jwt.sign({ userId }, JWT_SECRET);

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Task',
          description: 'Test Description',
          status: 'todo',
        });

      expect(response.status).toBe(201);
      expect(response.body.task.title).toBe('Test Task');
    });
  });

  describe('GET /api/tasks', () => {
    it('should get all tasks for user', async () => {
      await Task.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo',
        createdBy: userId,
      });

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.tasks).toHaveLength(1);
    });
  });
});
