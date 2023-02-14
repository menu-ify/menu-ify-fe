const url = 'https://menu-ify-be.herokuapp.com/api/v1/restaurants'

describe('The delete menu item user flow', () => {
  beforeEach(() => {
    cy.intercept(url, { fixture: '../fixtures/restaurant_data.json' })
    cy.visit('http://localhost:3000/')
  })

  it('should have a header with a title and dropdown menu', () => {
    cy.get('.material-symbols-outlined').click()
    cy.get('[href="/admin/restaurant"] > .dropdown__menu-item > .dropdown__button > i').click()
  })
})