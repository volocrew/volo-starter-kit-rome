/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Login Module Tests', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  before('login once', () => {
    cy.visit('/splash');
    cy.typeRomeLogin();
  });

  it('Should be able to navigate to compliance lists page', () => {
    cy.url().should('include', '/compliance/lists');
  });

  it('Should be able to show user name', () => {
    cy.get('[data-cy="cy-menu-username"]').contains('Pablo Arcia'); // TODO change to QA full name
  });

  it('Should be able to log out when click logout button', () => {
    cy.get('[data-cy="cy-menu-username"]').click();
    cy.get('[data-cy="cy-menu-logOut"]').click();
    cy.url().should('include', '/login');
  });

  it('Should be faile to login with wrong username', () => {
    cy.get('[data-cy="cy-loginUsername"]').type('wrong@username.com');
    cy.get('[data-cy="cy-loginPassword"]').type(Cypress.env('password'));
    cy.get('[data-cy="cy-loginButton"]').click();
    cy.contains('User does not exist');
  });

  it('Should be failed to login with wrong password', () => {
    cy.get('[data-cy="cy-loginUsername"]').click().clear();
    cy.get('[data-cy="cy-loginUsername"]').type(Cypress.env('username'));
    cy.get('[data-cy="cy-loginPassword"]').click().clear();
    cy.get('[data-cy="cy-loginPassword"]').type('wrongPassword');
    cy.get('[data-cy="cy-loginButton"]').click();
    cy.contains('Incorrect username or password');
  });
});
