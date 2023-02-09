import React from "react";
import './MenuItemDeleteCard.css'
import { useSelector, useDispatch } from 'react-redux';
import { updateMenu, selectMenu } from "../features/menu/menuSlice"
import { deleteData } from "../apiCalls"

const MenuItemDeleteCard = ({ name, restaurantId, id }) => {
  const handleDelete = (restaurantId, menuID) => {
    deleteData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${restaurantId}/menu_items/${menuID}`)
    } 
  return (
    <div>
      <p>{name}</p>
      <button onClick={() => handleDelete(restaurantId, id)}>Delete</button>
    </div>
  )
}
export default MenuItemDeleteCard