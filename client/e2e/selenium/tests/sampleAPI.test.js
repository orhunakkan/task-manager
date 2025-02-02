import { describe, it, expect, beforeAll } from 'vitest';
import axios from 'axios';
import crypto from 'crypto';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

let token;

describe('API Tests', () => {
    // Register
    it('POST /api/users/register - should register a new user', async () => {
        const generateRandomString = (length) => {
            return crypto.randomBytes(length).toString('hex');
        };
        const userData = {
            email: `${generateRandomString(5)}@example.com`,
            password: generateRandomString(10),
            name: `User_${generateRandomString(5)}`,
        };
        const resp = await api.post('/users/register', userData);
        expect(resp.status).toBe(201);
        expect(resp.data.status).toBe('success');
    });

    // Login
    it('POST /api/users/login - should login user', async () => {
        const resp = await api.post('/users/login', {
            email: 'test@example.com',
            password: 'password123',
        });
        expect(resp.status).toBe(200);
        expect(resp.data.status).toBe('success');
        token = resp.data.token;
    });

    // Get Tasks
    it('GET /api/tasks - should get all tasks for authenticated user', async () => {
        const resp = await api.get('/tasks', {
            headers: { Authorization: `Bearer ${token}` },
        });
        expect(resp.status).toBe(200);
        expect(resp.data.status).toBe('success');
    });

    // Create Task
    it('POST /api/tasks - should create a new task', async () => {
        const taskData = {
            title: 'New Task',
            description: 'Sample description',
            status: 'todo',
        };
        const resp = await api.post('/tasks', taskData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        expect(resp.status).toBe(201);
        expect(resp.data.status).toBe('success');
        expect(resp.data.task.title).toBe('New Task');
    });

    // Update Task
    it('PUT /api/tasks/:id - should update an existing task', async () => {
        // Create task first
        const newTask = await api.post(
            '/tasks',
            { title: 'Task to Update', status: 'todo' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const taskId = newTask.data.task._id;
        const resp = await api.put(
            `/tasks/${taskId}`,
            { title: 'Updated Title', status: 'in_progress' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(resp.status).toBe(200);
        expect(resp.data.task.title).toBe('Updated Title');
    });

    // Delete Task
    it('DELETE /api/tasks/:id - should delete an existing task', async () => {
        // Create task first
        const newTask = await api.post(
            '/tasks',
            { title: 'Task to Delete', status: 'todo' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const taskId = newTask.data.task._id;
        const resp = await api.delete(`/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        expect(resp.status).toBe(200);
        expect(resp.data.message).toBe('Task deleted');
    });
});