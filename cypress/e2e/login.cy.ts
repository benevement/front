describe("Login flow", () => {
  beforeEach(() => {
    cy.visit("/signin"); // ton URL de login
  });

  it("should show errors if fields are empty", () => {
    cy.get("button[type=submit]").click();

    cy.contains("Email est requis").should("exist");
    cy.contains("Mot de passe est requis").should("exist");
  });

  it("should login successfully with valid credentials", () => {
    // 👇 interception de l'API
    cy.intercept("POST", "/auth/login", {
      statusCode: 200,
      body: {
        accessToken: "fake-access",
        refreshToken: "fake-refresh",
        user: { id: 1, email: "test@example.com" },
      },
    }).as("loginRequest");

    // remplissage du formulaire
    cy.get("input#email").type("test@example.com");
    cy.get("input#password").type("password123");

    // soumission
    cy.get("button[type=submit]").click();

    // attend la requête
    cy.wait("@loginRequest");

    // vérifie la redirection
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should show error on wrong credentials", () => {
    cy.intercept("POST", "/auth/login", {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("loginRequest");

    cy.get("input#email").type("wrong@example.com");
    cy.get("input#password").type("wrongpass");
    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest");
    cy.contains("Login failed").should("exist");
  });
});
