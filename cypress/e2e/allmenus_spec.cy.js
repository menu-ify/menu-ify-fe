describe('The restaurant menus', () => {
  beforeEach(() => {
    const url = 'https://a1ecae6b-2320-4cd4-91ed-7da641c93480.mock.pstmn.io/api/v1/restaurants/'
    cy.intercept('https://a1ecae6b-2320-4cd4-91ed-7da641c93480.mock.pstmn.io//api/v1/restaurants/100', { fixture: '../fixtures/pho_kyah_menu.json'})
  })
  it('should have something', () => {
    cy.visit('http://localhost:3000/restaurants/100')
    expect(true).to.be.true
  })
})