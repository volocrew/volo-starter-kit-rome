/// <reference types="cypress" />

describe('App E2E', () => {
  it('should have text Employee Login', () => {
    cy.visit('/');
    cy.contains('Employee Login');
  });
});
