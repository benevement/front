describe('Should do something', () => {
  it('should connect to a site', () => {
    cy.visit('https://example.cypress.io')
    cy.contains(/[Qq]ueryin./).should('exist')
    cy.contains("Querying").should('exist')
    cy.contains("querying").should('exist')
  })
})