import React from "react";
import './MenuItemDeleteCard.css'
import { useDispatch } from "react-redux"
import { deleteMenuItemAsync } from "../features/menu/menuSlice"

const MenuItemDeleteCard = ({name, restaurantId, id}) => {
  const dispatch = useDispatch()
  const handleDelete = (e) => {
    e.preventDefault()
    let menuId = e.target.id
    let restaurantId = e.target.name
    dispatch(deleteMenuItemAsync(restaurantId, menuId))
  }
  return (
    <section>
      <p>{name}</p>
      <button onClick={(event) => handleDelete(event)}>Delete</button>
    </section>
  )
}

export default MenuItemDeleteCard