import React from "react"
import { useDispatch } from "react-redux"
import { deleteMenuItemAsync } from "../features/menu/menuSlice"

const DeleteMenuItem = ({ adminSelections }) => {
  console.log(adminSelections)
  const dispatch = useDispatch()

  const handleDelete = (e) => {
    e.preventDefault()
    let menuId = e.target.id
    let restaurantId = e.target.name
    console.log("e.target.restaurantid", e.target.name)
    console.log("e.target.id", e.target.id)
    console.log("MADE IT TO HANDLE DELETE")
    dispatch(deleteMenuItemAsync(restaurantId, menuId))
  }

  return (
    <div>
      <h1>Delete View</h1>
      <button id={38} name={100} onClick={(event) => handleDelete(event)}>Delete</button>
    </div>
  )
}

export default DeleteMenuItem