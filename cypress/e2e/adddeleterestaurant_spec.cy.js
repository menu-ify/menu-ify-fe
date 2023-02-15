const url = 'https://menu-ify-be.herokuapp.com/api/v1/restaurants'

describe('The add/delete restaurant user flow', () => {
  beforeEach(() => {
    cy.intercept(url, { fixture: '../fixtures/restaurant_data.json' })
    cy.visit('http://localhost:3000/admin/restaurant')
  })

  it('should have a title and instructions', () => {
    cy.get(':nth-child(2) > .rpc-title').contains('Admin View')
    cy.get(':nth-child(2) > .rpc-instructions').contains('Add a restaurant')
    cy.get('.delete-margin > .rpc-title').contains('Admin View')
    cy.get('.delete-margin > .rpc-instructions').contains('Delete a restaurant')
    cy.get('.search-button').contains('Add new restaurant')
  })

  it('should have a preview of the restaurant to be added', () => {
    cy.get('[placeholder="Enter name..."]').type('test title')
    cy.get('[placeholder="Enter description..."]').type('test description')
    cy.get('[placeholder="Search for image..."]').type('taco')
    // cy.get('.restaurant-image').should('have.attr', 'src', 'https://s3.memeshappen.com/memes/Testing-.jpg')
    cy.get('.RPC-title').contains('test title')
    cy.get('.RPC-description').contains('test description')
  })

  it('should show the current restaurants and have buttons to delete them', () => {
    cy.get(':nth-child(3) > .delete-header').contains('Pho Kyah')
    cy.get('.delete-margin > :nth-child(3)').contains('Delete')
    cy.get(':nth-child(4) > .delete-header').contains('Tim\'s Tiki Bar')
    cy.get('.delete-margin > :nth-child(4)').contains('Delete')
    cy.get(':nth-child(5) > .delete-header').contains('Ruthy\'s')
    cy.get('.delete-margin > :nth-child(5)').contains('Delete')
  })

  it('should add a new restaurant to the admin page', () => {
    cy.get('[placeholder="Search for image..."]').type('test title')
    cy.get(':nth-child(2) > :nth-child(6)').click()
    cy.intercept('GET', "https://menu-ify-fastapi.herokuapp.com/photos/test-description", { fixture: '../fixtures/add_restaurant_data.json' })
    cy.get('.search-button-container').click()
  })

  it('should display the newly-added restaurant', () => {
    cy.intercept(url, { fixture: '../fixtures/add_restaurant_data.json' })
    cy.visit('http://localhost:3000/admin/restaurant')
    cy.get(':nth-child(6) > .delete-header').contains('test title')
  })

  it('should delete the newly-added restaurant', () => {
    cy.intercept(url, { fixture: '../fixtures/add_restaurant_data.json' })
    cy.visit('http://localhost:3000/admin/restaurant')
    cy.get(':nth-child(6) > .delete-header').contains('test title')
    cy.intercept('DELETE', `${url}/400`, { fixture: '../fixtures/restaurant_data.json' })
    cy.get(':nth-child(6) > button').click()
    cy.get('.restaurant-admin-error-message > .text-container').contains('Restaurant deleted')
    cy.get('.restaurant-admin-error-message').click()
    cy.get('.restaurant-admin-error-message').should('not.exist')
  })

  it('should display the remaining restaurants after a restaurant is deleted', () => {
    cy.get(':nth-child(5) > .delete-header').contains('Ruthy\'s')
    cy.get(':nth-child(6) > .delete-header').should('not.exist')
  })

})