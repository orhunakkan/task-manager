/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      // 'e2e/selenium/tests/**/*.test.{js,ts}'
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  }
});