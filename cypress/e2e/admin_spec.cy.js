describe('The Admin page', () => {
  beforeEach(() => {
    const url = 'https://menu-ify-be.herokuapp.com/api/v1/restaurants'
    cy.intercept(url, { fixture: '../fixtures/restaurant_data.json' })
    cy.visit('http://localhost:3000/admin')
  })
 
  it('should have a page title and instructions', () => {
    cy.get('.rpc-title').contains('Admin View')
    cy.get('.admin-instructions-container > :nth-child(2)').contains('Complete the following')
  })


})