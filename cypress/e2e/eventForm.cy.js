describe("Test de création d'un évènement", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3000/auth/login", {
      email: "coco@test.fr",
      password: "password"
    }).then((resp) => {
      const { user, accessToken , refreshToken } = resp.body;

      window.localStorage.setItem("user", JSON.stringify(user));
      window.localStorage.setItem("accessToken", accessToken );
      window.localStorage.setItem("refreshToken", refreshToken);
    });

    cy.visit("/events/new");
  });

  it("should create an event with valid values without hitting the real API", () => {
    // 1️⃣ Intercepter la création d'événement et renvoyer un faux event
    cy.intercept("POST", "**/events", {
      statusCode: 201,
      body: {
        id: 999, // id fictif
        name: "Evènement n°1",
        description: "Description de l'évènement",
        address: {
          street_number: "12",
          street_name: "Rue des fleurs",
          city: "Honfleur",
          zip_code: "14600"
        },
        date: "2025-08-29",
        volunteers_needed: 22,
        invitedVolunteers: [3, 4],
        creatorId: 1,
        status: "DRAFT"
      },
    }).as("createEventRequest");

    // 2️⃣ Stub pour la récupération du nouvel event après navigation
    cy.intercept("GET", "**/events/999", {
      statusCode: 200,
      body: {
        id: 999,
        name: "Evènement n°1",
        description: "Description de l'évènement",
        address: {
          street_number: "12",
          street_name: "Rue des fleurs",
          city: "Honfleur",
          zip_code: "14600"
        },
        date: "2025-08-29",
        volunteers_needed: 22,
        invitedVolunteers: [3, 4],
        creatorId: 1,
        status: "DRAFT"
      },
    }).as("getEventRequest");

    // 3️⃣ Remplir le formulaire
    cy.get("input[name='name']").type("Evènement n°1");
    cy.get("textarea[name='description']").type("Description de l'évènement");
    cy.get("input[name='address.street_number']").type("12");
    cy.get("input[name='address.street_name']").type("Rue des fleurs");
    cy.get("input[name='address.city']").type("Honfleur");
    cy.get("input[name='address.zip_code']").type("14600");
    cy.get("input[name='date']").type("2025-08-29");
    cy.get("input[name='volunteers_needed']").type("22");

    // 4️⃣ Simuler la sélection des volontaires dans la modale
    cy.get("button#invite-volunteers").click();
    cy.get("input[type='checkbox']").first().check();
    cy.get("input[type='checkbox']").eq(1).check();
    cy.get("button#validate-volunteers").click();
    cy.wait(1000);

    // 5️⃣ Submit
    cy.get("button#create-event").click();

    // 6️⃣ Assertions
    cy.wait("@createEventRequest").its("response.statusCode").should("eq", 201);
    cy.url().should("include", "/events/999");
    cy.wait("@getEventRequest").its("response.statusCode").should("eq", 200);
  });
});
