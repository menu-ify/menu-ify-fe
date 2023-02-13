describe('The add menu item page', () => {
  beforeEach(() => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
    cy.visit('http://localhost:3000/admin/add-menu-item')
  })

  it('should have a title and instructions', () => {
    cy.get('.rpc-title').contains('Admin View')
    cy.get('.rpc-instructions').contains('Build a new menu item for :')
    cy.get(':nth-child(1) > .form-select').contains('Restaurant')
    cy.get(':nth-child(2) > .form-select').contains('Category...')
    cy.get('[name="name"]').should('have.attr', 'placeholder', 'Enter name...')
    cy.get('[name="price"]').should(
      'have.attr',
      'placeholder',
      'Enter number for price...'
    )
    cy.get('.form > [name="description"]').should(
      'have.attr',
      'placeholder',
      'Enter description...'
    )
    cy.get('[name="search"]').should(
      'have.attr',
      'placeholder',
      'Search for image...'
    )
    cy.get(':nth-child(7) > .search-button').contains('Start image search')
    cy.get('.form-header').contains('Search results')
    cy.get('.form > :nth-child(10)').contains('Preview')
    cy.get(':nth-child(12) > .search-button').contains('Add new menu item')
    cy.get('.menu-item-name').contains('- $')
  })

  it('should add menu items to the Pho Kyah menu', () => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
    cy.get(':nth-child(1) > .form-select').select(1)
    cy.get(':nth-child(2) > .form-select').select(1)
    cy.get('[name="name"]').type('Test')
    cy.get('[name="price"]').type('1')
    cy.get('.form > [name="description"]').type('Test')
    cy.get('.form > [name="search"]').type('Test')
    cy.get('.search-results > p').contains('No results')
    cy.get('.menu-item-image').should(
      'have.attr',
      'src',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png'
    )
    cy.get('.menu-item-name').contains('Test - $1')
    cy.get('.menu-item-description').contains('Test')
    cy.intercept(
      'POST',
      'https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items',
      (req) => {
        req.reply({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              id: '11111',
              type: 'menu_item',
              attributes: {
                restaurant_id: 100,
                name: 'Test',
                description: 'Test',
                tags: 'No tags added',
                category: 'appetizer',
                image:
                  'https://mailtrap.io/wp-content/uploads/2020/06/testing_meme3.png',
                price: 1.0,
              },
            },
          }),
        })
      }
    )
    cy.get(':nth-child(12) > .search-button').click()
    cy.get('.confirm-modal > p').contains('Menu item added!')
    cy.get('.admin-button').click()
    cy.intercept(
      'https://menu-ify-be.herokuapp.com/api/v1/restaurants/100/menu_items',
      { fixture: '../fixtures/after_post_pho_kyah_menu.json' }
    )
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
    cy.visit('http://localhost:3000/restaurant/100/')
    cy.get(
      ':nth-child(1) > :nth-child(2) > :nth-child(3) > .menu-image-container > .menu-item-image'
    ).should(
      'have.attr',
      'src',
      'https://mailtrap.io/wp-content/uploads/2020/06/testing_meme3.png'
    )
    cy.get(
      ':nth-child(1) > :nth-child(2) > :nth-child(3) > .menu-item-container-info > .menu-item-name'
    ).contains('Test - $1')
    cy.get(
      ':nth-child(1) > :nth-child(2) > :nth-child(3) > .menu-item-container-info > .menu-item-description'
    ).contains('Test')
  })

  it.only("should add menu items to the Tim's menu", () => {
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
    cy.get(':nth-child(1) > .form-select').select(2)
    cy.get(':nth-child(2) > .form-select').select(1)
    cy.get('[name="name"]').type('Test')
    cy.get('[name="price"]').type('2')
    cy.get('.form > [name="description"]').type('Test')
    cy.get('.form > [name="search"]').type('Test')
    cy.get('.search-results > p').contains('No results')
    cy.get('.menu-item-image').should(
      'have.attr',
      'src',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png'
    )
    cy.get('.menu-item-name').contains('Test - $2')
    cy.get('.menu-item-description').contains('Test')
    cy.intercept(
      'POST',
      'https://menu-ify-be.herokuapp.com/api/v1/restaurants/200/menu_items',
      (req) => {
        req.reply({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              id: '11111',
              type: 'menu_item',
              attributes: {
                restaurant_id: 200,
                name: 'Test',
                description: 'Test',
                tags: 'No tags added',
                category: 'appetizer',
                image:
                  'https://mailtrap.io/wp-content/uploads/2020/06/testing_meme3.png',
                price: 2.0,
              },
            },
          }),
        })
      }
    )
    cy.get(':nth-child(12) > .search-button').click()
    cy.get('.confirm-modal > p').contains('Menu item added!')
    cy.get('.admin-button').click()
    cy.intercept(
      'https://menu-ify-be.herokuapp.com/api/v1/restaurants/200/menu_items',
      { fixture: '../fixtures/after_post_tims_menu_items.json' }
    )
    cy.intercept('https://menu-ify-be.herokuapp.com/api/v1/restaurants', {
      fixture: '../fixtures/restaurant_data.json',
    })
    cy.visit('http://localhost:3000/restaurant/200/')
    cy.get(
      ':nth-child(1) > :nth-child(2) > :nth-child(3) > .menu-image-container > .menu-item-image'
    ).should(
      'have.attr',
      'src',
      'https://mailtrap.io/wp-content/uploads/2020/06/testing_meme3.png'
    )
    cy.get(
      ':nth-child(1) > :nth-child(2) > :nth-child(3) > .menu-item-container-info > .menu-item-name'
    ).contains('Test - $2')
    cy.get(
      ':nth-child(1) > :nth-child(2) > :nth-child(3) > .menu-item-container-info > .menu-item-description'
    ).contains('Test')
  })
})
