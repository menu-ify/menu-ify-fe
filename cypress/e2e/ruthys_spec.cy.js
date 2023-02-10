describe('The Ruthy\'s menu', () => {
  beforeEach(() => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants/300/menu_items', { fixture: '../fixtures/ruthys_menu.json'})
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', { fixture: '../fixtures/restaurant_data.json'})
    cy.visit('http://localhost:3000/restaurant/300/')
  })

  it('should show the menu item image', () => {
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png'
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .menu-image-container > .menu-item-image').should('have.attr', 'src', defaultImage)
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(2) > .menu-image-container > .menu-item-image').should('have.attr', 'src', defaultImage)
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .menu-image-container > .menu-item-image').should('have.attr', 'src', defaultImage)
  })

  it('should show the menu item name', () => {
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .menu-item-container-info > .menu-item-name').contains('Mac and Cheese - $9')
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > .menu-item-container-info > .menu-item-name').contains('Black Eyed Peas - $10')
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(3) > .menu-item-container-info > .menu-item-name').contains('Fried Okra - $5')
  })

  it('should show the menu item description', () => {
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .menu-item-container-info > .menu-item-description').contains('The special sauce helps it slide down')
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > .menu-item-container-info > .menu-item-description').contains('They sing, dance, rap and satisfy your hunger')
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(3) > .menu-item-container-info > .menu-item-description').contains('Crispy on the outside and slimy on the inside, just like Ma used to make')
  })
})