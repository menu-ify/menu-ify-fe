describe('The Pho Kyah add menu item page', () => {
  beforeEach(() => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
    cy.visit('http://localhost:3000/admin/add-menu-item')
  })
 
  it('should have a title and instructions', () => {
    cy.get('.rpc-title').contains('Admin View')
    cy.get('.rpc-instructions').contains('Build a new menu item for :')
    cy.get(':nth-child(1) > .form-select').contains('Restaurant')
    cy.get(':nth-child(2) > .form-select').contains('Category...')
    cy.get('[name="name"]').should('have.attr', 'placeholder', 'Enter name...')
    cy.get('[name="price"]').should('have.attr', 'placeholder', 'Enter number for price...')
    cy.get('.form > [name="description"]').should('have.attr', 'placeholder', 'Enter description...')
    cy.get('[name="search"]').should('have.attr', 'placeholder', 'Search for image...')
    cy.get(':nth-child(7) > .search-button').contains('Start image search')
    cy.get('.form-header').contains('Search results')
    cy.get('.form > :nth-child(10)').contains('Preview')
    cy.get(':nth-child(12) > .search-button').contains('Add new menu item')
    cy.get('.menu-item-name').contains('- $')
  })
})