/// <reference types="cypress" />

describe('Forms page E2E testing', () => {
  it('should have a user form', () => {
    cy.visit('/forms');

    cy.get('form[data-testid="data-form"]').should('be.visible');
  });

  it('should have warning message', () => {
    cy.visit('/forms');

    cy.get('input[data-testid="user-name"]').type('rocky').should('have.value', 'rocky');

    cy.get('button[type="submit"]').click();
    cy.get('span[data-testid="user-name-error"]').should('be.visible');

    cy.get('input[data-testid="user-name"]').clear().type('Rocky');
    cy.get('span[data-testid="user-name-error"]').should('not.exist');
  });

  it('should fill form and create user card', () => {
    cy.visit('/forms');

    cy.get('input[data-testid="user-name"]').type('Rocky').should('have.value', 'Rocky');
    cy.get('input[data-testid="user-surname"]').type('Balboa').should('have.value', 'Balboa');
    cy.get('input[data-testid="user-date"]').type('2023-04-25').should('have.value', '2023-04-25');
    cy.get('select[data-testid="user-planet"]').select('mars').should('have.value', 'mars');
    cy.get('input[data-testid="user-access"]').check().should('be.checked');
    cy.get('input[data-testid="user-access-crew"]').check().should('be.checked');
    cy.get('input[data-testid="user-typeCrew"]').check().should('be.checked');

    cy.get('input[data-testid="user-file"]').selectFile({
      contents: './src/assets/Rocky.png',
      fileName: 'Rocky.png',
      mimeType: 'image/png',
      lastModified: Date.now(),
    });

    cy.get('button[type="submit"]').click();
    cy.get('div[data-testid="user-cards-item"]').should('be.visible');
    cy.get('input[data-testid="user-name"]').should('have.value', '');
  });

  it('should save user card when routing', () => {
    cy.visit('/forms');

    cy.get('input[data-testid="user-name"]').type('Rocky').should('have.value', 'Rocky');
    cy.get('input[data-testid="user-surname"]').type('Balboa').should('have.value', 'Balboa');
    cy.get('input[data-testid="user-date"]').type('2023-04-25').should('have.value', '2023-04-25');
    cy.get('select[data-testid="user-planet"]').select('mars').should('have.value', 'mars');
    cy.get('input[data-testid="user-access"]').check().should('be.checked');
    cy.get('input[data-testid="user-access-crew"]').check().should('be.checked');
    cy.get('input[data-testid="user-typeCrew"]').check().should('be.checked');

    cy.get('input[data-testid="user-file"]').selectFile({
      contents: './src/assets/Rocky.png',
      fileName: 'Rocky.png',
      mimeType: 'image/png',
      lastModified: Date.now(),
    });

    cy.get('button[type="submit"]').click();

    cy.get('input[data-testid="user-name"]').type('Rocky2').should('have.value', 'Rocky2');
    cy.get('input[data-testid="user-surname"]').type('Balboa2').should('have.value', 'Balboa2');
    cy.get('input[data-testid="user-date"]').type('2023-04-25').should('have.value', '2023-04-25');
    cy.get('select[data-testid="user-planet"]').select('mars').should('have.value', 'mars');
    cy.get('input[data-testid="user-access"]').check().should('be.checked');
    cy.get('input[data-testid="user-access-crew"]').check().should('be.checked');
    cy.get('input[data-testid="user-typeCrew"]').check().should('be.checked');

    cy.get('input[data-testid="user-file"]').selectFile({
      contents: './src/assets/tiger.jpg',
      fileName: 'tiger.jpg',
      mimeType: 'image/png',
      lastModified: Date.now(),
    });

    cy.get('button[type="submit"]').click();
    cy.get('div[data-testid="user-cards-item"]').should('be.visible');

    cy.get('a[href="/home"]').click();
    cy.get('a[href="/forms"]').click();

    cy.get('div[data-testid="user-cards-item"]').should('be.visible');
  });
});
