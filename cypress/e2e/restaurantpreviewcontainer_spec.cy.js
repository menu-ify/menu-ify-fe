describe('RestaurantPreviewContainer', () => {
  beforeEach(() => {
    const url = 'https://menu-ify-be.herokuapp.com/api/v1/restaurants'
    cy.intercept(url, { fixture: '../fixtures/restaurant_data.json' })
    cy.visit('http://localhost:3000/')
  })
  it('should be visible', () => {
    cy.get('.restaurantMenuContainer').should('be.visible')
  })

  it('should have a welcome message', () => {
    cy.get('.rpc-title').contains('Welcome!')
    cy.get('.rpc-instructions').contains('Select a restaurant to get started')
  })
  
  it('should havea a card for Pho Kyah', () => {
    cy.get(':nth-child(3) > .card-container').should('be.visible')
    cy.get(':nth-child(3) > .card-container > .restaurant-image-container > .restaurant-image').should('have.attr', 'src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ph%E1%BB%9F_v%E1%BB%8Bt_quay.jpg/640px-Ph%E1%BB%9F_v%E1%BB%8Bt_quay.jpg')
    cy.get(':nth-child(3) > .card-container > .nav-link > .RPC-title').contains('Pho Kyah')
    cy.get(':nth-child(3) > .card-container > .RPC-description').contains('Experimental Asian fusion gastropub')
  })

  it("should havea a card for Tim's Tiki Bar", () => {
    cy.get(':nth-child(4) > .card-container').should('be.visible')
    cy.get(':nth-child(4) > .card-container > .restaurant-image-container > .restaurant-image').should('have.attr', 'src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/VacuumPacks-02.jpg/640px-VacuumPacks-02.jpg')
    cy.get(':nth-child(4) > .card-container > .nav-link > .RPC-title').contains("Tim's Tiki Bar")
    cy.get(':nth-child(4) > .card-container > .RPC-description').contains('All the aloha you can eat')
  })
  
  it("should havea a card for Ruthy's", () => {
    cy.get(':nth-child(5) > .card-container').should('be.visible')
    cy.get(':nth-child(5) > .card-container > .restaurant-image-container > .restaurant-image').should('have.attr', 'src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Flickr_kb35_1644526369--Chicken_fried_steak.jpg/640px-Flickr_kb35_1644526369--Chicken_fried_steak.jpg')
    cy.get(':nth-child(5) > .card-container > .nav-link > .RPC-title').contains("Ruthy's")
    cy.get(':nth-child(5) > .card-container > .RPC-description').contains('Emotional support food for all the seasons of life')
  })
})

//test