describe('The Pho Kyah menu', () => {
  beforeEach(() => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items', { fixture: '../fixtures/pho_kyah_menu.json'})
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', { fixture: '../fixtures/restaurant_data.json'})
    cy.visit('http://localhost:3000/restaurant/100/')
  })

  it('should show the menu item image', () => {
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png'
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .menu-image-container > .menu-item-image').should('have.attr', 'src', defaultImage)
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(2) > .menu-image-container > .menu-item-image').should('have.attr', 'src', defaultImage)
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .menu-image-container > .menu-item-image').should('have.attr', 'src', defaultImage)
  })

  it('should show the menu item name', () => {
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .menu-item-container-info > .menu-item-name').contains('Fresh Green Salad - $5.5')
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > .menu-item-container-info > .menu-item-name').contains('Spring Rolls - $7.5')
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .menu-item-container-info > .menu-item-name').contains('Pho with Beef - $15')
  })

  it('should show the menu item description', () => {
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .menu-item-container-info > .menu-item-description').contains('Vegetables and stuff with sauce')
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > .menu-item-container-info > .menu-item-description').contains('3 fresh spring rolls')
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .menu-item-container-info > .menu-item-description').contains('Vietnamese soup with beef and veggies')
  })
})