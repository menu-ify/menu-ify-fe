import React, { useMemo, useCallback } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router"
import { getData } from "../apiCalls"
import MenuItems from "../MenuItems/MenuItems"
import NotFound from "../NotFound/NotFound"
import './Menu.css'
import { setInitialMenu } from "../features/menu/menuSlice"

const Menu = ({ restaurants, setLogo, setRestaurantName }) => {
  const menuItems = useSelector((state) => state.menu)
  const dispatch = useDispatch()
  const checkIfValid = (id) => {
    return restaurants.find(restaurant => Number(restaurant.id) === Number(id))
  }
  const { id } = useParams()
  const getRestaurant = useCallback(() => {
    return restaurants.find(restaurant => Number(restaurant.id) === Number(id))
  }, [id, restaurants])


  const isValidId = checkIfValid(id)

  useMemo(() => {
    getData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${id}/menu_items`)
      .then(data => {
        dispatch(setInitialMenu(data.data))
        const restaurant = getRestaurant();
        if (restaurant) {
          setLogo(restaurant.attributes.logo)
          setRestaurantName(restaurant.attributes.name)
        }
      })
      .catch(error => {
        console.log("Fetch error", error)
      })
  }, [id, dispatch, setLogo, setRestaurantName, getRestaurant])

  const filterByCategory = (category) => {
    return menuItems.filter(menuItem => menuItem.attributes && menuItem.attributes.category.toLowerCase() === category.toLowerCase())
  }

  const filteredMenuItems = (category) => filterByCategory(category).map(menuItems => {
    return (
      // <MenuItems
      //   key={menuItems.id}
      //   name={menuItems.attributes.name}
      //   image={menuItems.attributes.image}
      //   price={menuItems.attributes.price}
      //   description={menuItems.attributes.description}
      // />

      <MenuItems
        key={menuItems.id}
        name={menuItems.attributes ? menuItems.attributes.name : ''}
        image={menuItems.attributes ? menuItems.attributes.image : ''}
        price={menuItems.attributes ? menuItems.attributes.price : ''}
        description={menuItems.attributes ? menuItems.attributes.description : ''}
      />
    )
  })
  return (
    <>

      {isValidId ? (

        <section className="menu-container">
          <div className="category-container">
            <h2 className="category-title">Appetizers</h2>
            <section>{filteredMenuItems("appetizer")}</section>
          </div>
          <div className="category-container">
            <h2 className="category-title">Entrees</h2>
            <section>{filteredMenuItems("entree")}</section>
          </div>
          <div className="category-container">
            <h2 className="category-title">Draft Beer</h2>
            <section>{filteredMenuItems("draft beer")}</section>
          </div>
          <div className="category-container">
            <h2 className="category-title">Cocktails</h2>
            <section>{filteredMenuItems("cocktail")}</section>
          </div>
        </section>)
        : (<NotFound />)
      }
    </>
  )
}

export default Menu