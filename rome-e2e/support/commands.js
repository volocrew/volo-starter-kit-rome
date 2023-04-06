// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import 'cypress-localstorage-commands';

//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => {});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('typeRomeLogin', () => {
  cy.get('[data-cy="cy-gotoLogin"]').click();
  cy.get('[data-cy="cy-loginUsername"]').click();
  cy.get('[data-cy="cy-loginUsername"]').type(Cypress.env('username'));
  cy.get('[data-cy="cy-loginPassword"]').type(Cypress.env('password'));
  cy.get('[data-cy="cy-loginButton"]').click();
});
