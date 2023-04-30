import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.spec.cy.ts',
    },
  },
  e2e: {
    video: false,
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      on('file:preprocessor', vitePreprocessor());
      return config;
    },
    //experimentalStudio: true,
  },
});
