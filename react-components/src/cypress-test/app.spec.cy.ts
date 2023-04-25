/// <reference types="cypress" />

describe('Home page E2E testing', () => {
  it('should have a search form', () => {
    cy.visit('/');

    cy.get('input[type="search"]').should('have.value', '');
    cy.get('button[type="submit"]').should('have.text', '');
  });

  it('should search films', () => {
    cy.visit('/');

    cy.get('input[type="search"]').type('Rocky').should('have.value', 'Rocky');

    cy.get('button[type="submit"]').click();
    cy.get('div[data-testid="card-list"]').should('be.visible');
  });

  it('should open modal window', () => {
    cy.visit('/');

    cy.get('input[type="search"]').type('Rocky').should('have.value', 'Rocky');

    cy.get('button[type="submit"]').click();
    cy.get('div[data-testid="card-list"]').should('be.visible');

    cy.get('div[id="0"]').click();
    cy.get('div[data-testid="modal-window"]').should('be.visible');

    cy.get('div[data-testid="modal-window"] > h3').should('be.visible');

    cy.get('div[data-testid="modal-window"] > h3').invoke('text').then((text => {
      expect(text.trim()).to.eq('Rocky')
    }));
  });

  it('should close modal window', () => {
    cy.visit('/');

    cy.get('input[type="search"]').type('Rocky').should('have.value', 'Rocky');

    cy.get('button[type="submit"]').click();
    cy.get('div[data-testid="card-list"]').should('be.visible');

    cy.get('div[id="0"]').click();
    cy.get('div[data-testid="modal-window"]').should('be.visible');

    cy.get('[data-testid="close-icon"]').click();
    cy.get('div[data-testid="modal-window"]').should('not.exist');
  });
});
