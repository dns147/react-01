import { defineConfig } from 'cypress';
//import '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://localhost:3001',
    supportFile: false,
    specPattern: './src/cypress-test/',
    setupNodeEvents(on, config) {
      //require('@cypress/code-coverage/task')(on, config)
      //return config
    },
  },
});
