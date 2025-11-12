//const { CYPRESS_URL_BASE } = require("./connection.cy")

describe('Should do something', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/formtest')
  })


  it("should verify various stuff", () => {
    cy.contains(/[Nn]ame/).should('exist')
    cy.get('input[placeholder="Bill"]').should('exist')
    cy.get('.px-5')
    cy.get('p').contains("fish")
  })
  it("'ladiv2test' is present.", () => {
    cy.get('[data-cy="ladiv2test"]').should('exist')
  })

  it("should check if passwords are matching", () => {
    cy.get('[data-cy="password1"]').should('exist')
    cy.get('[data-cy="password2"]').should('exist')
    cy.get('[data-cy="password1"]').type('Azerty123#')
    cy.get('[data-cy="password1"]').should('have.value', 'Azerty123#')
    cy.get('[data-cy="password2"]').type('Azerty123#')
  })

it ("It should compares password ok", () => {

    cy.get('button[name="nbutt1"]').click()
    //compar
    cy.get('[data-cy="password1"]').should(($field1) => {
      cy.get('[data-cy="password2"]').should(($field2) => {
        expect($field1.val()).to.equal($field2.val());
      });
    });
  })
  /*
    cy.get('[data-cy="password1"]').invoke("val").should(val1 => {
      cy.get('[data-cy="password2"]').invoke("val").should(val2 => {
        expect(val1).to.equal(val2);
      });
    });

}
*/

}) // end decribe
