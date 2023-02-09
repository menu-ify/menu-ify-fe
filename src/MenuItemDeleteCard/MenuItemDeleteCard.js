import React from "react";
import './MenuItemDeleteCard.css'
import { useSelector, useDispatch } from 'react-redux';
import { updateMenu, selectMenu } from "../features/menu/menuSlice"

const MenuItemDeleteCard = () => {
  const menu = useSelector(selectMenu);
  console.log("THIS MENU", menu.menu)
  const menuItemsArray = menu.menu.map((menuItems) => {
    return (
      <div>
        <p>{menuItems.attributes.name}</p>
      </div>
    )})

  return (
    <>
    <p>Menu item name</p>
    {menuItemsArray}
    </>
  )
}
export default MenuItemDeleteCard