// @ts-nocheck
// basé sur les routes définies dans le routeur.

// baseUrl: "http://localhost:5173", from cypress.config.ts
// npm install --save-dev @types/jest @types/cypress
// to execute : npx cypress open



describe('Vérification des routes', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Must pass every links on Home Page', () => {
    // bouton "Evenements" apparent si utilisateur connecté.
    cy.get('button').filter((idx: number, element: HTMLElement) => {
      // utilisation de filter car sinon, retourne plusieurs éléments 
      // on ne peut pas se référer à un id ou un autre attribut du bouton (rien de précisé dans le code)
      // que le texte affiché dessus.
      return Cypress.$(element).text().match(/[Cc]onnexion/) !== null;
    }).click()
    cy.url().should('include', '/signin')
    cy.get('button').filter((i, e) => (Cypress.$(e).text().match(/Créer|Create|signup|register|enregistr/) !== null)).click()
    cy.url().should('include', '/signup')

  })

  it('should Signin page have /signin URL and Google OAuth access', () => {
    cy.visit('/signin')
    cy.url().should('include','/signin')
    cy.contains('Se connecter avec Google').invoke('attr', 'href').should('include', '/auth/google').then((lien) => {
      console.log(lien)
      expect(lien).to.equal('/auth/google')
  })

  it('must prevent user from access the page if not registered', () => {
   
    
 
      
    });

    
  })

})

    /*
    .invoke('text').then((texte) =>{
    expect(texte).to.match(/[Cc]onnexion/) // verif texte du bouton
    }).then (() => {
      cy.get('button').click()
      cy.url().should('include', '/signin')
    })
    */

/*

  it('Must pass every links => URL', () => {
    // bouton "Evenements" apparent si utilisateur connecté.
    cy.get('button').invoke('text').should('include', 'événements').click()
    //cy.get('button').invoke('text').should('include', /[Rr]etour/).click()
    //cy.url().should('include', '/event')
  })
 // page events => liste des évènements, bouton "Retour"
*/

/*
describe('Vérification des routes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Must pass every links => URL', () => {
    // Vérifier que le bouton "Evenements" est visible et cliquable
    cy.get('button').invoke('text').then((text) => {
      expect(text).to.include('événements');
    }).click();

    // Vérifiez la redirection après le clic
    cy.url().should('include', '/event');
  });
});
*/

/*
 // Pages accessibles aux visiteurs
  { path: "/", element: <Homepage />, allowVisitor: true },
  { path: "/liens", element: <HomePageLiens />, allowVisitor: true },
  { path: "/signin", element: <SignIn />, allowVisitor: true },
  { path: "/signup", element: <SignUp />, allowVisitor: true },
  
  { path: "/formtest", element: <FormTest />, allowVisitor: true }, // pour tests - temporaire.
  { path: "/formtest2", element: <NotificationMsTest />, allowVisitor: true }, // pour tests - temporaire.
  { path: "/voltask/:url_event_id/tasks", element: <VolunteerTask />, allowVisitor: true }, // pour tests - temporaire.
  //{ path: "/voltask", element: <VolunteerTask2 />, allowVisitor: true }, // pour tests - temporaire.
  //TODO: à redéplacer quand câblé avec le Back.

  { path: "/auth/google", allowVisitor: true }, // lien pour l'authentification Google OAuth2

  // Pages réservées aux utilisateurs connectés
  { path: "/events/new", element: <EventForm />, allowedRoles: adminRole  },
  { path: "/events", element: <EventsList />, allowedRoles: allRoles  },
  { path: "/events/:id/edit", element: <EventForm />, allowedRoles: adminRole  },
  { path: "/events/:id/", element: <EventDetails />, allowedRoles: allRoles  },
  { path: "/users/profile", element: <UserProfile />, allowedRoles: allRoles  }, // rev 07/09 mda
  { path: "/users/avail", element: <Availabilities />, allowedRoles: eventMembersRoles  },
  { path: "/users/skills", element: <UserSkills />, allowedRoles: eventMembersRoles  },
  { path: "/events/:url_event_id/tasks", element: <VolunteerTask />, allowedRoles: eventMembersRoles },
*/