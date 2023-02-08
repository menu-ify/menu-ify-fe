import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router"
import { getData } from "../apiCalls"
import MenuItems from "../MenuItems/MenuItems"
import NotFound from "../NotFound/NotFound"
import { updateMenu, selectMenu } from "../features/menu/menuSlice";
import './Menu.css'

const Menu = ({ restaurants }) => {
  const menu = useSelector(selectMenu);
  const dispatch = useDispatch();
  const checkIfValid = (id) => {
    return restaurants.find(restaurant => Number(restaurant.id) === Number(id))
  }
  const { id } = useParams()
  const isValidId = checkIfValid(id)
  useEffect(() => {
    getData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${id}/menu_items`)
      .then(data => {
        dispatch(updateMenu(data.data))
      })
  }, [id, dispatch])

  const filterByCategory = (category) => {
    return menu.filter(menuItem => menuItem.attributes.category === category)
  }

  const filteredMenuItems = (category) => filterByCategory(category).map(menuItems => {
    return (
      <MenuItems
        key={menuItems.id}
        name={menuItems.attributes.name}
        image={menuItems.attributes.image}
        price={menuItems.attributes.price}
        description={menuItems.attributes.description}
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