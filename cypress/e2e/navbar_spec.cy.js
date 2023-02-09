describe('The NavBar component', () => {
  it('should have a header with a title and dropdown menu', () => {
    cy.intercept('url', { fixture: '../fixtures/restaurant_data.json' })
    cy.visit('http://localhost:3000/')
    cy.get('.name1').contains('Menu')
    cy.get('.name2').contains('ify')
    cy.get('.material-symbols-outlined').click()
    cy.get('[href="/"] > .dropdown__menu-item > .dropdown__button').contains('Home')
    cy.get('[href="/admin"] > .dropdown__menu-item > .dropdown__button').contains('Admin')
    cy.get('[href="/restaurant/100"] > .dropdown__menu-item > .dropdown__button').contains('Pho Kyah')
    cy.get('[href="/restaurant/200"] > .dropdown__menu-item > .dropdown__button').contains("Tim's Tiki Bar")
    cy.get('[href="/restaurant/300"] > .dropdown__menu-item > .dropdown__button').contains("Ruthy's")
  })
})