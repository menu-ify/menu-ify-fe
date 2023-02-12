describe('The Pho Kyah add menu item page', () => {
  beforeEach(() => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
    cy.visit('http://localhost:3000/admin/add-menu-item')
  })
 
  it('should have a title', () => {
    cy.get('.rpc-title').contains('Admin View')
  })
})