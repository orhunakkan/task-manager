/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: [
      'e2e/selenium/tests/**/*.test.{js,ts}' // Exclude Selenium tests
    ],
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  }
});