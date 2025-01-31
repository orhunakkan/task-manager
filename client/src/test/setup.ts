import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';
import testLogger from './testLogger';

// Global error handler for tests
beforeAll(() => {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    originalConsoleError(...args);
    testLogger.error(args.join(' '));
  };

  // Handle unhandled rejections
  process.on('unhandledRejection', (error) => {
    testLogger.error('Unhandled Promise Rejection:', error);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    testLogger.error('Uncaught Exception:', error);
  });
});

afterEach(() => {
  cleanup();
});
