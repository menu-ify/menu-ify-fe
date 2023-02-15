describe('404 Error page', () => {
  beforeEach(() => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', { fixture: '../fixtures/restaurant_data.json' })
    cy.visit('http://localhost:3000/socks')
  })

  it.only('should only be visible on undesignated routes', () => {
    cy.get('.nf-title').should('be.visible')
    cy.visit('http://localhost:3000/')
    cy.get('.rpc-title').should('be.visible')
    cy.visit('http://localhost:3000/potatoes')
    cy.get('.nf-title').should('be.visible')

    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items', { fixture: '../fixtures/pho_kyah_menu.json' })
    cy.visit('http://localhost:3000/restaurant/100')
    cy.get('.restaurant-name-nav').contains("Pho Kyah")
    cy.get(':nth-child(1) > .category-title').contains('Appetizers')

    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants/200/menu_items', { fixture: '../fixtures/tims_menu.json' })
    cy.visit('http://localhost:3000/restaurant/200')
    cy.get(':nth-child(2) > .category-title').contains('Entrees')

    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants/300/menu_items', { fixture: '../fixtures/ruthys_menu.json' })
    cy.visit('http://localhost:3000/restaurant/300')
    cy.get(':nth-child(3) > .category-title').contains('Draft Beer')

    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants/400/menu_items', { fixture: '../fixtures/pho_kyah_menu.json' })
    cy.visit('http://localhost:3000/restaurant/400')
    cy.get('.NFC-title').contains('Explore more menus')

    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants/socks/menu_items', { fixture: '../fixtures/pho_kyah_menu.json' })
    cy.visit('http://localhost:3000/restaurant/socks')
    cy.get('.NFC-description').contains('Tap or click for other restaurants')
    const url = '/undesignated-route'
    cy.request({ url, failOnStatusCode: false }).its('status', { timeout: 0 })
    cy.get('.nf-title').should('be.visible')
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
