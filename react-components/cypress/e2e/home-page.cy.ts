/// <reference types="cypress" />

describe('Home page E2E testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a search form', () => {
    cy.get('input[type="search"]').should('have.value', '');
    cy.get('button[type="submit"]').should('have.text', '');
  });

  it('should search and show popular movies', () => {
    cy.get('input[type="search"]').should('have.value', '');
    cy.get('div[data-testid="card-list"]').should('be.visible');
  });

  it('should have message "No Movies Found!"', () => {
    cy.get('input[type="search"]').type('rrrrr');
    cy.get('h2')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.eq('No Movies Found!');
      });

    cy.get('div[data-testid="card-list"]').should('not.exist');
  });

  it('should search films', () => {
    cy.get('input[type="search"]').type('Rocky').should('have.value', 'Rocky');

    cy.get('button[type="submit"]').click();
    cy.get('div[data-testid="card-list"]').should('be.visible');
  });

  it('should open modal window', () => {
    cy.get('input[type="search"]').type('Rocky').should('have.value', 'Rocky');

    cy.get('button[type="submit"]').click();
    cy.get('div[data-testid="card-list"]').should('be.visible');

    cy.get('div[id="0"]').click();
    cy.get('div[data-testid="modal-window"]').should('be.visible');

    cy.get('div[data-testid="modal-window"] > h3').should('be.visible');

    cy.get('div[data-testid="modal-window"] > h3')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.eq('Rocky');
      });
  });

  it('should close modal window', () => {
    cy.get('input[type="search"]').type('Rocky').should('have.value', 'Rocky');

    cy.get('button[type="submit"]').click();
    cy.get('div[data-testid="card-list"]').should('be.visible');

    cy.get('div[id="0"]').click();
    cy.get('div[data-testid="modal-window"]').should('be.visible');

    cy.get('[data-testid="close-icon"]').click();
    cy.get('div[data-testid="modal-window"]').should('not.exist');
  });

  it('should save search cards when routing', () => {
    cy.get('input[type="search"]').type('Rocky').should('have.value', 'Rocky');

    cy.get('button[type="submit"]').click();
    cy.get('div[data-testid="card-list"]').should('be.visible');

    cy.get('input[type="search"]')
      .invoke('val')
      .then((val) => {
        const inputValue = String(val);

        cy.get('a[href="/forms"]').click();
        cy.get('a[href="/home"]').click();

        cy.get('input[type="search"]').should('have.value', inputValue);
        cy.get('div[data-testid="card-list"]').should('be.visible');
      });
  });
});
