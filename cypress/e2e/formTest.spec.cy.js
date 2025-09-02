const { CYPRESS_URL_BASE } = require("./connection.cy")


describe('Should do something', () => {

  beforeEach(() => {
   cy.visit("http://localhost:5173/formtest")
   //cy.visit(CYPRESS_URL_BASE+"/formtest")
  })

  // it('should connect to a site', () => {
  //   cy.visit('http://localhost:5173/formtest')
  // })

  it("should verify various stuff", () => {
    cy.contains(/[Nn]ame/).should('exist')
    cy.get('input[placeholder="Bill"]').should('exist')
    cy.get('.px-5')
    cy.get('p').contains("fish")
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
    cy.get('[data-cy="password1"]').invoke("val").then((field1) => {
      cy.get('[data-cy="password2"]').invoke("val").then((field2) => {
        expect(field1).to.equal(field2);
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
