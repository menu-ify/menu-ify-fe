describe('The Tim\'s add menu item page', () => {
  beforeEach(() => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
    cy.visit('http://localhost:3000/admin/add-menu-item')
  })

  it('should add menu items to the Tim\'s menu', () => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
    cy.get(':nth-child(1) > .form-select').select(2)
    cy.get(':nth-child(2) > .form-select').select(1)
    cy.get('[name="name"]').type('Test')
    cy.get('[name="price"]').type('1')
    cy.get('.form > [name="description"]').type('Test')
    cy.get('.form > [name="search"]').type('Test')
    cy.get('.search-results > p').contains('No results')
    cy.get('.menu-item-image').should('have.attr', 'src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png')
    cy.get('.menu-item-name').contains('Test - $1')
    cy.get('.menu-item-description').contains('Test')
    cy.intercept('POST', 'https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items', (req) => {
      req.reply({
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Intercepted POST request' })
      })
    })
    // cy.get(':nth-child(12) > .search-button').click()
    // cy.get('.confirm-modal > p').contains('Menu item added!')
    // cy.get('.admin-button').click()
  })
})