import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';
//import codeCoverageUseBabelrc from '@cypress/code-coverage/use-babelrc';

export default defineConfig({
  // env: {
  //   codeCoverage: {
  //     //exclude: './src/cypress-test/',
  //     exclude: 'cypress/**/*.*',
  //   },
  // },
  e2e: {
    video: false,
    baseUrl: 'http://localhost:3001',
    specPattern: './src/cypress-test/',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      //on('file:preprocessor', codeCoverageUseBabelrc);
      return config;
    },
    //experimentalStudio: true,
  },
});
