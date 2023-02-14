import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setInitialMenu } from "../features/menu/menuSlice"
import MenuItemDeleteCard from "../MenuItemDeleteCard/MenuItemDeleteCard"
import { getData } from "../apiCalls"
import './DeleteMenuItem.css'

const DeleteMenuItem = ({ restaurants }) => {
  const menuItems = useSelector((state) => state.menu)
  const dispatch = useDispatch()
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const [restaurantId, setRestaurantId] = useState("")
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

  // const getRestaurantId = () => {
  //   if (!selectedRestaurant || selectedRestaurant === "Select a restaurant...") { return }
  //   const restaurant = restaurants.find((restaurant) => {
  //     return restaurant.attributes.name === selectedRestaurant
  //   })
  //   setRestaurantId(restaurant.id)
  // }

  const getRestaurantId = () => {
    if (!selectedRestaurant || selectedRestaurant === "Select a restaurant...") { return }
    const restaurant = restaurants.find((restaurant) => {
      return restaurant.attributes.name === selectedRestaurant
    })
    if (restaurant) {
      setRestaurantId(restaurant.id)
    }
  }

  useEffect(() => {
    if (!selectedRestaurant) {
      return
    }

    getRestaurantId()

    getData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${restaurantId}/menu_items`)
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
  }, [selectedRestaurant, restaurantId, dispatch])

  const menuItemsArray = menuItems.map((menuItem) => {
      console.log("menuItem", menuItem)
    return (
      <MenuItemDeleteCard
        key={menuItem.id}
        id={menuItem.id}
        name={menuItem.attributes.name}
        restaurantId={menuItem.attributes.restaurant_id}
      />
    )
  })

  // const menuItemsArray = menuItems.map((menuItem) => {
  //   getData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${restaurantId}/menu_items`)
  //     .then(data => {
  //       dispatch(setInitialMenu(data.data))
  //     }).then(() => {
  //       return (
  //         <MenuItemDeleteCard
  //           key={menuItem.id}
  //           id={menuItem.id}
  //           name={menuItem.attributes.name}
  //           restaurantId={menuItem.attributes.restaurant_id}
  //         />
  //       )

  //     })
   
  // })


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
          getRestaurantId()
        }}>

        <option>Select a restaurant...</option>

        {restaurantOptions()}
      </select>


      {menuItems.length > 0 && menuItemsArray}

    </div>
  )
}

export default DeleteMenuItem