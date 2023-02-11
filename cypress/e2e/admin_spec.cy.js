describe('The Admin page', () => {
  beforeEach(() => {
    const url = 'https://menu-ify-be.herokuapp.com/api/v1/restaurants'
    cy.intercept(url, { fixture: '../fixtures/restaurant_data.json' })
    cy.visit('http://localhost:3000/admin')
  })
 
  it('should have a page title and instructions', () => {
    cy.get('.rpc-title').contains('Admin View')
    cy.get('.admin-instructions-container > :nth-child(2)').contains('Complete the following')
    cy.get('.form-instructions > :nth-child(1)').contains('1. Select a restaurant to edit')
    cy.get('.form-instructions > :nth-child(3)').contains('2. Select the action to take')
    cy.get('.form-instructions > :nth-child(5)').contains('3. When all fields are completed click "Get started".')
  })

  it('should have a drop down menu to select a restaurant', () => {
    cy.get(':nth-child(2) > .form-select').contains('None selected')
    cy.get(':nth-child(2) > .form-select').contains('Pho Kyah')
  })
  it('should have a drop down menu to select an action to take', () => {})
  it('should have a drop down menu to select a restaurant', () => {})
})