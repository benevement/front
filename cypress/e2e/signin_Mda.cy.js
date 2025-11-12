const { type } = require("os")
const { Input } = require("postcss")

describe('should check signin ok', () => {

  beforeEach(() => {
    cy.wait(0)
    cy.visit('/signin')  //cy.visit('http://localhost:5173/signin')
  })

  it('Should connect to server React', () => {
    cy.visit('/signin') // check si la page s'affiche
  })
  it('Should display "Connexion" on the Signin page', () => {
    cy.contains(/[Cc]onnexion/).should('exist') // regex pour "connexion"
  })

  // placeholder email
  it('Should display "Email" on placeholder for the mail input field', () => {
    cy.get('Input[type="Email"]')
      .should('be.visible')
      .invoke('attr', 'placeholder')
      //.should('eq','Email') // OK
      .then((placeholder) => {  // solution alternative (regex)
        expect(placeholder).to.match(/[Ee]mail/)
      })
  })

  it('should check if each field is OK before submit', () => {
    cy.get('input[type=email]')
      .should('exist').and('be.visible')
    cy.get('input[id="password"]') // ou cy.get('input#password')
      .should('have.attr', 'type', 'password')
  })

})

/*
.invoke("val") // invoke("val") récupère la valeur du champ
    .then((value) => {
        expect(value).to.have.length.greaterThan(3)
        expect(value).to.match(/([A-Za-z0-9]){1,16}(\.|-|_)*([A-Za-z0-9]){1,16}@([A-Za-z0-9]){1,16}\.[a-z]{2,3}/) // mail
    })
*/