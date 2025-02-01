import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'e2e/cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'e2e/cypress/payloads',
    supportFile: false,
    baseUrl: 'http://localhost:3000',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});
