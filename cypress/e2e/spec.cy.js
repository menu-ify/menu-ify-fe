describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
  it("expects true to be true", () => {
    expect(true).to.be.true
  })
})