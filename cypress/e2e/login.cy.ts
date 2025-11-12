// @ts-nocheck
/// <reference types="cypress" />

describe("Login flow", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("should show errors if fields are empty 00", () => {
    cy.get("button[type=submit]").click();

    cy.contains("Email est requis").should("exist");
    cy.contains("Mot de passe est requis").should("exist");
  });

  it("should login successfully with valid credentials", () => {

    cy.intercept("POST", "http://localhost:3000/auth/login", {
    }).as("loginRequest");

    //cy.get("input#email").type("test@example.com");
    //cy.get("input#password").type("password823");
    cy.get("input#email").type("admin@test.fr");
    cy.get("input#password").type("Azerty123456#");
    cy.get("button[type=submit]").click();
    cy.wait("@loginRequest").then((response) => {
      expect(response.response?.statusCode).to.eq(200);
    });
    cy.url().should('include', '/')
  });
/*
  it("should show error on wrong credentials", () => {

    cy.get("input#email").type("wrong@example.com");
    cy.get("input#password").type("wrongpass");
    cy.get("button[type=submit]").click();

    cy.contains("❌ Login failed").should("exist");
  });

*/

});
