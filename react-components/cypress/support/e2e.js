import '@cypress/code-coverage/support';
import 'cypress/react';

afterEach(() => {
  cy.window().trigger('unload');
});
