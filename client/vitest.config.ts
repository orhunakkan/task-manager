/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'], // Remove 'allure-vitest/setup'
    reporters: ["verbose"],
  }
});