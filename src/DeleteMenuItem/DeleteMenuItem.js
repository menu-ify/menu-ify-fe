import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMenuItemAsync } from "../features/menu/menuSlice"
import MenuItemDeleteCard from "../MenuItemDeleteCard/MenuItemDeleteCard"
import './DeleteMenuItem.css'

const DeleteMenuItem = ({ adminSelections }) => {
  const menuItems = useSelector((state)=> state.menu)
  console.log(adminSelections)
  const dispatch = useDispatch()
  
  useMemo(() => {
    getData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${adminSelections.restaurantId}/menu_items`)
      .then(data => {
        console.log("DATA", data.data)
        dispatch(setInitialMenu(data.data))
      })
      // .catch(error => {
      //   console.log("Fetch error: ", error)
      //   setError(error)
      // })
  }, [adminSelections.restaurantId, dispatch])

  const menuItemsArray = menuItems.map((menuItem)=> {
    return (
      <MenuItemDeleteCard
        key={menuItem.id}
        id={menuItem.id}
        name={menuItem.attributes.name}
        restaurantID={menuItem.attributes.restaurant_id}
      />
      )
    })

  // const handleDelete = (e) => {
  //   e.preventDefault()
  //   let menuId = e.target.id
  //   let restaurantId = e.target.name
  //   dispatch(deleteMenuItemAsync(restaurantId, menuId))
  // }

  return (
    <div>
      <h2>Delete any menu items: </h2>
      {menuItemsArray}
      {/* <button id={38} name={100} onClick={(event) => handleDelete(event)}>Delete</button> */}
    </div>
  )
}

export default DeleteMenuItem