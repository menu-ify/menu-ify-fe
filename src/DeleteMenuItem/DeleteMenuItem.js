import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteMenuItemThunk } from "../features/menu/menuSlice"

const DeleteMenuItem = ({ adminSelections }) => {
  console.log(adminSelections)
  const dispatch = useDispatch()

  const handleDelete = (e) => {
    e.preventDefault()
    let menuId = e.target.id
    let restaurantId = e.target.restaurantId
    console.log("MADE IT TO HANDLE DELETE")
    dispatch(deleteMenuItemThunk(menuId, restaurantId))
  }

  return (
    <div>
      <h1>Delete View</h1>
      <button id={38} restaurantid={100} onClick={(event) => handleDelete(event)}>Delete</button>
    </div>
  )
}

export default DeleteMenuItem