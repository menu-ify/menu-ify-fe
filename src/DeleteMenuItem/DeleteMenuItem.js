import React, { useMemo, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setInitialMenu } from "../features/menu/menuSlice"
import MenuItemDeleteCard from "../MenuItemDeleteCard/MenuItemDeleteCard"
import { getData } from "../apiCalls"
import './DeleteMenuItem.css'

const DeleteMenuItem = ({ adminSelections, restaurants }) => {
  const menuItems = useSelector((state) => state.menu)
  // console.log(adminSelections)
  const dispatch = useDispatch()
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const [restaurantId, setRestaurantId] = useState("")
  let id 

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

    const getRestaurantId = () => {
      // let name = event.target.value
      // setSelectedRestaurant(name)
    const restaurant = restaurants.find((restaurant) => {
      console.log("restaurant", restaurant)
      console.log("selectedRestaurant", selectedRestaurant)
      console.log("PATH", restaurant.attributes.name)
      return restaurant.attributes.name === selectedRestaurant
    })
    setRestaurantId(restaurant.id)
  }

  useMemo(() => {
    // getRestaurantId()
    getData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${restaurantId}/menu_items`)
      .then(data => {
        dispatch(setInitialMenu(data.data))
      })
      .catch(error => {
        console.log("Fetch error: ", error)
      })
  }, [restaurantId, dispatch,])

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
      <h2>Delete any menu items: </h2>
      <div className="add-select">
        <select className="form-select"
          value={selectedRestaurant}
          onChange={event => 
            // setSelectedRestaurant(event.target.value)
           {
            setSelectedRestaurant(event.target.value)
            getRestaurantId()

           }
          }
        >

          <option>Select a restaurant...</option>
          {restaurantOptions()}
        </select>

        {/* <button onClick={() => 
          getRestaurantId()}
          >Get menu items</button> */}
          
      </div>
      {menuItemsArray}
    </div>
  )
}

export default DeleteMenuItem