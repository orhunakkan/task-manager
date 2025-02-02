/// <reference types="vitest" />
import AllureReporter from "allure-vitest/reporter";
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts', 'allure-vitest/setup'],
    reporters: [
      "verbose",
      [
        "allure-vitest/reporter",
        {
          resultsDir: "allure-results",
        },
      ],
    ],
  }
});