describe('RestaurantPreviewContainer', () => {
  beforeEach(() => {
    const url = 'https://a1ecae6b-2320-4cd4-91ed-7da641c93480.mock.pstmn.io//api/v1/restaurants'
    cy.intercept(url, { fixture: '../fixtures/restaurant_data.json' })
    cy.visit('http://localhost:3000/')
  })
  it('should be visible', () => {
    cy.get('.restaurantMenuContainer').should('be.visible')
  })
  it('should havea a card for Pho Kyah', () => {
    cy.get(':nth-child(3) > .card-container').should('be.visible')
    cy.get(':nth-child(3) > .card-container > .restaurant-image-container > .restaurant-image').should('have.attr', 'src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ph%E1%BB%9F_v%E1%BB%8Bt_quay.jpg/640px-Ph%E1%BB%9F_v%E1%BB%8Bt_quay.jpg')
    cy.get(':nth-child(3) > .card-container > .nav-link > .RPC-title').contains('Pho Kyah')
    cy.get(':nth-child(3) > .card-container > .RPC-description').contains('Experimental Asian fusion gastropub')
  })
})
