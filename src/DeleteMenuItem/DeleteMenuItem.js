import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setInitialMenu } from "../features/menu/menuSlice"
import MenuItemDeleteCard from "../MenuItemDeleteCard/MenuItemDeleteCard"
import { getData } from "../apiCalls"
import './DeleteMenuItem.css'
import { useNavigate } from "react-router-dom"

const DeleteMenuItem = ({ adminSelections }) => {
  const restaurantID = adminSelections.restaurantId
  const navigate = useNavigate()
  const menuItems = useSelector((state) => state.menu)
  const dispatch = useDispatch()

  useMemo(() => {
    getData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${adminSelections.restaurantId}/menu_items`)
      .then(data => {
        dispatch(setInitialMenu(data.data))
      })
      .catch(error => {
        console.log("Fetch error: ", error)
      })
  }, [adminSelections.restaurantId, dispatch])

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
    <>
      {restaurantID ?
        (<div className="delete-container">
          <h2 className="rpc-title">Admin View</h2>
          <h3 className="rpc-instructions">Delete menu items for {adminSelections.selectedRestaurant}: </h3>
          {menuItemsArray}
        </div>)
        : navigate("/admin")
      }
    </>
  )
}

export default DeleteMenuItem