describe('404 Error page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/socks')
  })
  it('should only be visible on undesignated routes', () => {
    cy.get('.nf-title').should('be.visible')
    cy.visit('http://localhost:3000/')
    cy.get('.rpc-title').should('be.visible')
    cy.visit('http://localhost:3000/potatoes')
    cy.get('.nf-title').should('be.visible')
  })
  it('should have a title', () => {
    cy.get('.name').contains('Menuify')
  })
  it('should have an error message', () => {
    cy.get('.nf-title').contains('404')
    cy.get('.nf-instructions').contains('Page Not Found')
  })
  it('should have an image', () => {
    cy.get('.error-image').should(
      'have.attr',
      'src',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Sorry_we_are_closed_sign.jpg/640px-Sorry_we_are_closed_sign.jpg'
    )
    cy.get('.error-image').should(
      'have.attr',
      'alt',
      'Sorry We Are Closed sign hanging in a restaurant window'
    )
  })
  it('should have a link to the welcome page', () => {
    cy.get('.error-card-container').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})
