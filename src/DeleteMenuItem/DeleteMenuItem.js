import React, { useEffect } from "react"
import MenuItemDeleteCard from "../MenuItemDeleteCard/MenuItemDeleteCard"
import { updateMenu, selectMenu } from "../features/menu/menuSlice"
import { useSelector, useDispatch } from 'react-redux';
import { getData } from "../apiCalls"

const DeleteMenuItem = ({ adminSelections }) => {
  const menu = useSelector(selectMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    getData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${adminSelections.restaurantId}/menu_items`)
      .then(data => {
        dispatch(updateMenu(data.data))
      })
  }, [adminSelections.restaurantId, dispatch])

  const menuItemsArray = menu.map((menuItems)=> {
    return (
      <div>
        <p>{menuItems.attributes.name}</p>
      </div>
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