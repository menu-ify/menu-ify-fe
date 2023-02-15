import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setInitialMenu } from "../features/menu/menuSlice"
import MenuItemDeleteCard from "../MenuItemDeleteCard/MenuItemDeleteCard"
import { getData } from "../apiCalls"
import './DeleteMenuItem.css'

const DeleteMenuItem = ({ restaurants }) => {
  const menuItems = useSelector((state) => state.menu)
  const dispatch = useDispatch()
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const [message, setMessage] = useState('')

  const restaurantOptions = () => {
    return restaurants.map((restaurant) => {
      return (
        <option
          key={restaurant.id}
          id={restaurant.id}
        >
          {restaurant.attributes.name}
        </option>
      )
    })
  }

  const getRestaurantId = useCallback(() => {
    return restaurants.reduce((id, restaurant) => {
      if (restaurant.attributes.name === selectedRestaurant) {
        id = restaurant.id
      }
      return id
    }, 0)
  }, [restaurants, selectedRestaurant])

  useEffect(() => {
    if (!getRestaurantId()) {
      return
    }
    getData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${getRestaurantId()}/menu_items`)
      .then(data => {
        dispatch(setInitialMenu(data.data))
      })
      .catch(error => {
        setMessage("Loading... Refresh page if needed")
        window.scrollTo(0, 0)
        setTimeout(() => {
          setMessage("")
        }, 4000)
        console.log("Fetch error: ", error)
      })
  }, [selectedRestaurant, dispatch, getRestaurantId])

  const menuItemsArray = menuItems.map((menuItem) => {
    return (
      <MenuItemDeleteCard
        key={menuItem.id}
        id={menuItem.id}
        name={menuItem.attributes.name}
        restaurantId={menuItem.attributes.restaurant_id}
      />
    )
  })

  return (
    <div className="delete-container">
      <h2 className="rpc-title">Admin View</h2>
      <h3 className="rpc-instructions">
        Delete menu items:
      </h3>

      {message &&
        <div
          className="restaurant-admin-error-message text-container"
          onClick={() => setMessage("")}>
          <div
            className="text-container"
          >
            {message}
          </div >
          (Click to close)
        </div>}

      <select className="delete-select"
        value={selectedRestaurant}
        placeholder="Select a restaurant..."
        onChange={event => {
          setSelectedRestaurant(event.target.value)
        }}>

        <option value="" disabled defaultValue="">Select a restaurant...</option>
        {restaurantOptions()}
      </select>


      {menuItems.length > 0 && selectedRestaurant ? menuItemsArray : null}

    </div>
  )
}

export default DeleteMenuItem