const url = 'https://menu-ify-be.herokuapp.com/api/v1/restaurants'

describe('The delete menu item user flow', () => {
  beforeEach(() => {
    cy.intercept(url, { fixture: '../fixtures/restaurant_data.json' })
    cy.visit('http://localhost:3000/')
  })

  it('should allow a user to delete an menu item', () => {
    cy.get('.material-symbols-outlined').click()
   
    cy.get(
      '[href="/admin/delete"] > .dropdown__menu-item > .dropdown__button > i'
    ).click()
   
    cy.url().should('eq', 'http://localhost:3000/admin/delete')
   
    cy.intercept(
      'https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items',
      { fixture: '../fixtures/pho_kyah_menu.json' }
    )
   
    cy.get('.delete-select').select(1)
   
    cy.intercept(
      'DELETE',
      'https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items/10',
      { fixture: '../fixtures/after_delete_phokyah_menu.json' }
    )
    cy.get(':nth-child(13) > .delete-button').click()
   
    cy.intercept(
      'https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items',
      { fixture: '../fixtures/pho_kyah_menu.json' }
    )
   
    cy.visit('http://localhost:3000/')
   
    cy.get('.material-symbols-outlined').click()
   
    cy.get(
      '[href="/admin/delete"] > .dropdown__menu-item > .dropdown__button > i'
      ).click()
   
    cy.get('.delete-select').select(1)
   
    
    cy.intercept(
      'https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items',
      { fixture: '../fixtures/after_delete_phokyah_menu.json' }
      )

    cy.url().should('eq', 'http://localhost:3000/admin/delete')
      
    cy.get('.delete-container > :nth-child(12)').contains('Tiger Asian Lager')

    // cy.get('.delete-container > :nth-child(13)').should('not.exist')
  })








  it('should no longer display the deleted menu item after it is deleted', () => {
    cy.get('.material-symbols-outlined').click()
   
    cy.get(
      '[href="/admin/delete"] > .dropdown__menu-item > .dropdown__button > i'
    ).click()
   
    cy.url().should('eq', 'http://localhost:3000/admin/delete')
   
    cy.intercept(
      'https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items',
      { fixture: '../fixtures/after_delete_phokyah_menu.json' }
    )
   
    cy.get('.delete-select').select(1)
   
    cy.intercept(
      'DELETE',
      'https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items/10',
      { fixture: '../fixtures/after_delete_phokyah_menu.json' }
    )

    cy.url().should('eq', 'http://localhost:3000/admin/delete')
      
    cy.get('.delete-container > :nth-child(12)').contains('Tiger Asian Lager')

    cy.get('.delete-container > :nth-child(13)').should('not.exist')
  } )
})
