import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { User } from '../models/user';
import { Task } from '../models/task';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';

describe('Task Routes', () => {
  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    // Create a test user
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
    userId = (user._id as unknown as string).toString();
    authToken = jwt.sign({ userId }, JWT_SECRET);
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo',
      };

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(taskData);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.task.title).toBe(taskData.title);
      expect(response.body.task.createdBy.toString()).toBe(userId);
    });
  });

  describe('GET /api/tasks', () => {
    it('should get all tasks for user', async () => {
      // Create some test tasks
      await Task.create([
        {
          title: 'Task 1',
          description: 'Description 1',
          status: 'todo',
          createdBy: userId,
        },
        {
          title: 'Task 2',
          description: 'Description 2',
          status: 'in_progress',
          createdBy: userId,
        },
      ]);

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.tasks).toHaveLength(2);
      expect(response.body.tasks[0].createdBy.toString()).toBe(userId);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      // Create a test task
      const task = await Task.create({
        title: 'Task to delete',
        description: 'This task will be deleted',
        status: 'todo',
        createdBy: userId,
      });

      const response = await request(app)
        .delete(`/api/tasks/${task._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Task deleted');

      // Verify task was deleted
      const deletedTask = await Task.findById(task._id);
      expect(deletedTask).toBeNull();
    });
  });
});
