import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';
import { User } from '../models/user';

describe('Auth Routes', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  };

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('User registered successfully');

      // Verify user was created in database
      const user = await User.findOne({ email: testUser.email });
      expect(user).toBeTruthy();
      expect(user?.name).toBe(testUser.name);
    });

    it('should not register user with existing email', async () => {
      // First registration
      await request(app).post('/api/users/register').send(testUser);

      // Second registration with same email
      const response = await request(app)
        .post('/api/users/register')
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Email already registered');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login existing user', async () => {
      // Register user first
      await request(app).post('/api/users/register').send(testUser);

      // Try to login
      const response = await request(app).post('/api/users/login').send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.token).toBeTruthy();
      expect(response.body.user).toBeTruthy();
    });

    it('should not login with incorrect password', async () => {
      // Register user first
      await request(app).post('/api/users/register').send(testUser);

      // Try to login with wrong password
      const response = await request(app).post('/api/users/login').send({
        email: testUser.email,
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
});
