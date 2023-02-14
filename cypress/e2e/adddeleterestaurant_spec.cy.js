const url = 'https://menu-ify-be.herokuapp.com/api/v1/restaurants'

describe('The add/delete restaurant user flow', () => {
  beforeEach(() => {
    cy.intercept(url, { fixture: '../fixtures/restaurant_data.json' })
    cy.visit('http://localhost:3000/admin/restaurant')
  })
  
  it('should have a title', () => {
    cy.get(':nth-child(2) > .rpc-title').contains('Admin View')
    cy.get(':nth-child(2) > .rpc-instructions').contains('Add a restaurant')
  })

  it('should have a preview of the restaurant to be added', () => {
    cy.get('[placeholder="Enter name..."]').type('test title')
    cy.get('[placeholder="Enter description..."]').type('test description')
    cy.get('[placeholder="Enter URL to image..."]').type('https://s3.memeshappen.com/memes/Testing-.jpg')
    cy.get('.restaurant-image').should('have.attr', 'src', 'https://s3.memeshappen.com/memes/Testing-.jpg')
    cy.get('.RPC-title').contains('test title')
    cy.get('.RPC-description').contains('test description')
  })

  

})