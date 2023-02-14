describe('The Admin page', () => {
  beforeEach(() => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
    cy.visit('http://localhost:3000/admin')
  })

  it('should have a page title and instructions', () => {
    cy.get('.rpc-title').contains('Admin View')
    cy.get('.admin-instructions-container > :nth-child(2)').contains(
      'Complete the following'
    )
    cy.get('.form-instructions > :nth-child(1)').contains(
      '1. Select a restaurant to edit'
    )
    cy.get('.form-instructions > :nth-child(3)').contains(
      '2. Select the action to take'
    )
    cy.get('.form-instructions > :nth-child(5)').contains(
      '3. When all fields are completed click "Get started".'
    )
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
  })

  it('should have a drop down menu to select a restaurant', () => {
    cy.get(':nth-child(2) > .form-select')
      .select(0)
      .invoke('val')
      .should('eq', 'None selected')
    cy.get(':nth-child(2) > .form-select')
      .select(1)
      .invoke('val')
      .should('eq', 'Pho Kyah')
    cy.get(':nth-child(2) > .form-select')
      .select(2)
      .invoke('val')
      .should('eq', "Tim's Tiki Bar")
    cy.get(':nth-child(2) > .form-select')
      .select(3)
      .invoke('val')
      .should('eq', "Ruthy's")
  })

  it('should have a drop down menu to select an action to take', () => {
    cy.get(':nth-child(4) > .form-select')
      .select(0)
      .invoke('val')
      .should('eq', 'None selected')
    cy.get(':nth-child(4) > .form-select')
      .select(1)
      .invoke('val')
      .should('eq', 'Add new menu item')
    cy.get(':nth-child(4) > .form-select')
      .select(2)
      .invoke('val')
      .should('eq', 'Delete existing menu item')
  })
  
  it('should load the Pho Kyah admin page to add a menu item when the Get Started button is clicked', () => {
    cy.get(':nth-child(2) > .form-select').select(1)
    cy.get(':nth-child(4) > .form-select').select(1)
    cy.get('.admin-button').click()
    cy.url('eq', 'http://localhost:3000/admin/add-menu-item')
  })

  it('should load the Tim\'s admin page to add a menu item when the Get Started button is clicked', () => {
    cy.get(':nth-child(2) > .form-select').select(1)
    cy.get(':nth-child(4) > .form-select').select(1)
    cy.get('.admin-button').click()
    cy.url('eq', 'http://localhost:3000/admin/add-menu-item')
  })

  it('should load the Ruthy\'s admin page to add a menu item when the Get Started button is clicked', () => {
    cy.get(':nth-child(2) > .form-select').select(1)
    cy.get(':nth-child(4) > .form-select').select(1)
    cy.get('.admin-button').click()
    cy.url('eq', 'http://localhost:3000/admin/add-menu-item')
  })

  it('should load the Pho Kyah admin page to delete a menu item when the Get Started button is clicked', () => {
    cy.get(':nth-child(2) > .form-select').select(1)
    cy.get(':nth-child(4) > .form-select').select(2)
    cy.get('.admin-button').click()
    cy.url('eq', 'http://localhost:3000/admin/delete')
  })

  it('should load the Tim\'s admin page to delete a menu item when the Get Started button is clicked', () => {
    cy.get(':nth-child(2) > .form-select').select(1)
    cy.get(':nth-child(4) > .form-select').select(2)
    cy.get('.admin-button').click()
    cy.url('eq', 'http://localhost:3000/admin/delete')
  })

  it('should load the Ruthy\'s admin page to delete a menu item when the Get Started button is clicked', () => {
    cy.get(':nth-child(2) > .form-select').select(1)
    cy.get(':nth-child(4) > .form-select').select(2)
    cy.get('.admin-button').click()
    cy.url('eq', 'http://localhost:3000/admin/delete')
  })
})
