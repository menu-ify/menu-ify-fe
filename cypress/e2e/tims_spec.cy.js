describe('The Tim\'s Tiki Bar menu', () => {
  beforeEach(() => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants/200/menu_items', { fixture: '../fixtures/tims_menu.json'})
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', { fixture: '../fixtures/restaurant_data.json'})
    cy.visit('http://localhost:3000/restaurant/200/')
  })

  it('should show the menu item image', () => {
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png'
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .menu-image-container > .menu-item-image').should('have.attr', 'src', defaultImage)
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(2) > .menu-image-container > .menu-item-image').should('have.attr', 'src', defaultImage)
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .menu-image-container > .menu-item-image').should('have.attr', 'src', defaultImage)
  })

  it('should show the menu item name', () => {
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .menu-item-container-info > .menu-item-name').contains('Manapua - $4')
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > .menu-item-container-info > .menu-item-name').contains('Spam Musubi - $5')
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .menu-item-container-info > .menu-item-name').contains('Tofu Plate - $12.5')
  })

  it('should show the menu item description', () => {
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .menu-item-container-info > .menu-item-description').contains('Soft steamed dough filled with taro')
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > .menu-item-container-info > .menu-item-description').contains('Fried spam, egg, and rice wrapped in nori')
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .menu-item-container-info > .menu-item-description').contains('A big pile of steamed rice with vegetables and fried tofu')
  })
})