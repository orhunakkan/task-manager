import { User } from './user';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Model Test', () => {
  it('should validate a valid user', async () => {
    const validUser = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });

    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe('test@example.com');
    expect(savedUser.name).toBe('Test User');
  });

  it('should fail validation for invalid email', async () => {
    const userWithInvalidEmail = new User({
      email: 'invalid-email',
      password: 'password123',
      name: 'Test User',
    });

    await expect(userWithInvalidEmail.save()).rejects.toThrow();
  });

  it('should hash password before saving', async () => {
    const user = new User({
      email: 'test2@example.com',
      password: 'password123',
      name: 'Test User',
    });

    await user.save();
    expect(user.password).not.toBe('password123');
  });

  it('should correctly compare passwords', async () => {
    const user = new User({
      email: 'test3@example.com',
      password: 'password123',
      name: 'Test User',
    });

    await user.save();
    const isMatch = await user.comparePassword('password123');
    expect(isMatch).toBe(true);
  });
});
