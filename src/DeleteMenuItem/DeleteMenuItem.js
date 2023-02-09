import React, { useEffect } from "react"
import MenuItemDeleteCard from "../MenuItemDeleteCard/MenuItemDeleteCard"
import { updateMenu, selectMenu } from "../features/menu/menuSlice"
import { useSelector, useDispatch } from 'react-redux';
import { getData, deleteData } from "../apiCalls"

const DeleteMenuItem = ({ adminSelections }) => {
  const menu = useSelector(selectMenu);
  console.log("MENU", menu)
  const dispatch = useDispatch();
  useEffect(() => {
    getData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${adminSelections.restaurantId}/menu_items`)
      .then(data => {
        dispatch(updateMenu(data.data))
      })
  }, [adminSelections.restaurantId, dispatch])

  const menuItemsArray = menu.map((menuItems)=> {
    return (
      <MenuItemDeleteCard
        name={menuItems.attributes.name}
        id={menuItems.id}
        restaurantID={menuItems.attributes.restaurant_id}
      />
    )
  })
  console.log(adminSelections)
  return (
    <div>
    <h1>Delete View</h1>
    {menuItemsArray}
    </div>
  )
}

export default DeleteMenuItem