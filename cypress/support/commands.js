// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",(
    form = {
      firstName: "Fulano",
      lastName: "Ciclano",
      email: "test@test.com",
      longText: "long text test",
    }
  ) => {
    cy.get("#firstName").should("be.visible").type(form.firstName);
    cy.get("#lastName").should("be.visible").type(form.lastName);
    cy.get("#email").should("be.visible").type(form.email);
    cy.get("#open-text-area")
      .should("be.visible")
      .type(form.longText, { delay: 0 });
      cy.contains("button", "Enviar").should("be.visible").click();
  }
);
