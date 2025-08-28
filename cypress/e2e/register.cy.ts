describe("Register flow", () => {
  beforeEach(() => {
    cy.visit("/signup");

  });

  it("should show errors if fields are empty", () => {
    cy.get("button[type=submit]").click();

    cy.contains("Email est requis").should("exist");
    cy.contains("Le mot de passe est requis").should("exist");
    cy.contains("Confirmez le mot de passe").should("exist");
  });

  it("should register successfully", () => {

    cy.get("input#email").type("newuser@example.com");
    cy.get("input#password").type("mypassword");
    cy.get("input#confirmPassword").type("mypassword");
    cy.get("input#phone_number").type("0612345678");

    cy.get("button[type=submit]").click();

    cy.url().should('include', '/')

  });

  it("should show error if passwords do not match", () => {
    cy.get("input#email").type("fail@example.com");
    cy.get("input#password").type("123456");
    cy.get("input#confirmPassword").type("654321");

    cy.get("button[type=submit]").click();

    cy.contains("Les mots de passe ne correspondent pas").should("exist");
  });
});
