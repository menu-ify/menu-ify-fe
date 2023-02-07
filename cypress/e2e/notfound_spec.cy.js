describe('404 Error page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/socks')
  })
  it('should only be visible on undesignated routes', () => {
    cy.get('.nf-title').should('be.visible')
    // Should I intercept and stub a response right here with the restaurant data? Probably so...//
    cy.visit('http://localhost:3000/')
    cy.get('.rpc-title').should('be.visible')
    cy.visit('http://localhost:3000/potatoes')
    cy.get('.nf-title').should('be.visible')
    cy.visit('http://localhost:3000/restaurant/100')
    cy.get(':nth-child(1) > .category-title').contains('Appetizers')
    cy.visit('http://localhost:3000/restaurant/200')
    cy.get(':nth-child(2) > .category-title').contains('Entrees')
    cy.visit('http://localhost:3000/restaurant/300')
    cy.get(':nth-child(3) > .category-title').contains('Draft Beer')
    cy.visit('http://localhost:3000/restaurant/400')
    cy.get('.NFC-title').contains('Explore more menus')
    cy.visit('http://localhost:3000/restaurant/socks')
    cy.get('.NFC-description').contains('Tap or click for other restaurants')
  })
  it('should have a header with a title and dropdown menu', () => {
    cy.get('.name').contains('Menuify')
    cy.get('.material-symbols-outlined').click()
    cy.get('[href="/"] > .dropdown__menu-item > .dropdown__button')
      .contains('Home')
    cy.get('[href="/admin"] > .dropdown__menu-item > .dropdown__button')
      .contains('Admin')
    cy.get('[href="/restaurant/100"] > .dropdown__menu-item > .dropdown__button')
      .contains('Pho Kyah')
    cy.get('[href="/restaurant/200"] > .dropdown__menu-item > .dropdown__button')
      .contains("Tim's Tiki Bar")
    cy.get('[href="/restaurant/300"] > .dropdown__menu-item > .dropdown__button')
      .contains("Ruthy's")
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
