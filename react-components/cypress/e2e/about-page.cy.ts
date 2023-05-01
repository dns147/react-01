/// <reference types="cypress" />

describe('About page E2E testing', () => {
  it('should have header', () => {
    cy.visit('/about');

    cy.get('div[data-testid="about-page"] > h1').should('be.visible');

    cy.get('div[data-testid="about-page"] > h1')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.eq('AboutPage');
      });
  });
});
