import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateUser } from './auth';
import { JWT_SECRET } from '../config/auth';

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should authenticate valid JWT token', async () => {
    const token = jwt.sign({ userId: '123' }, JWT_SECRET);
    mockRequest.header = jest.fn().mockReturnValue(`Bearer ${token}`);

    await authenticateUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalled();
    // Only check if userId exists and matches
    expect(mockRequest.user).toBeDefined();
    expect(mockRequest.user?.userId).toBe('123');
  });

  it('should return 401 if no token provided', async () => {
    mockRequest.header = jest.fn().mockReturnValue(undefined);

    await authenticateUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Authentication required',
    });
  });

  it('should return 401 for invalid token', async () => {
    mockRequest.header = jest.fn().mockReturnValue('Bearer invalid-token');

    await authenticateUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Invalid authentication token',
    });
  });
});
