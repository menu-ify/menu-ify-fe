import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../Admin/Admin.css"

const Admin = ({ setAdminSelections, restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const [selectedAction, setSelectedAction] = useState("")
  const navigate = useNavigate()

  console.log(restaurants)

  const getRestaurantId = (restaurantName) => {
    for (const restaurant of restaurants) {
      if (restaurant.attributes.name === restaurantName) {
        return restaurant.id
      }
    }
    return null
  }

  const restaurantOptions = () => {
    return restaurants.map((restaurant) => {
      return (
        <option
          key={restaurant.id}
        >
          {restaurant.attributes.name}
        </option>
      )
    })
  }

  const submitForm = (event) => {
    event.preventDefault()
    if (
      selectedRestaurant === "None selected" ||
      selectedAction === "None selected" ||
      !selectedRestaurant ||
      !selectedAction
    ) {
      console.log("ADMIN FORM ERROR")
    } else if (selectedAction === "Add new menu item") {
      setAdminSelections(
        {
          selectedRestaurant: selectedRestaurant,
          selectedAction: selectedAction,
          restaurantId: getRestaurantId(selectedRestaurant)
        })
      navigate("/admin/add-menu-item")
    } else if (selectedAction === "Delete existing menu item") {
      setAdminSelections(
        {
          selectedRestaurant: selectedRestaurant,
          selectedAction: selectedAction,
          restaurantId: getRestaurantId(selectedRestaurant)
        })
      navigate("/admin/delete")
    } else if (selectedAction === "Add or delete restaurant") {
      setAdminSelections(
        {
          selectedRestaurant: selectedRestaurant,
          selectedAction: selectedAction,
          restaurantId: getRestaurantId(selectedRestaurant)
        })
      navigate("/admin/restaurant")
    }
  }

  const restaurantFieldAlert = () => {
    if (
      selectedRestaurant === "None selected" || !selectedRestaurant
    ) {
      return (
        <span style={{ color: "rgba(255, 0, 0, 0.8)", fontSize: "3vh" }}>*</span>
      )
    }
  }

  const actionFieldAlert = () => {
    if (
      selectedAction === "None selected" ||
      !selectedAction
    ) {
      return (
        <span style={{ color: "rgba(255, 0, 0, 0.8)", fontSize: "3vh" }}>*</span>
      )
    }
  }
  return (
    <form className="restaurantMenuContainer">
      <div className="admin-instructions-container">
        <h2 className="rpc-title">Admin View</h2>
        <p className="rpc-instructions">Complete the following</p>
        <div className="form-instructions">
          <p className="rpc-instructions">1. Select a restaurant to edit.</p>

          <div className="input-alert-container">
            <select className="form-select"
              value={selectedRestaurant}
              onChange={event => setSelectedRestaurant(event.target.value)}
            >
              <option key={Date.now()}>None selected</option>
              {restaurantOptions()}
            </select>
            {restaurantFieldAlert()}
          </div>

          <p className="rpc-instructions">2. Select the action to take.</p>
          <div className="input-alert-container">
            <select className="form-select"
              value={selectedAction}
              onChange={event => setSelectedAction(event.target.value)}
            >
              <option>None selected</option>
              <option>Add new menu item</option>
              <option>Delete existing menu item</option>
              <option>Add or delete restaurant</option>
            </select>
            {actionFieldAlert()}
          </div>
          <p className="rpc-instructions">3. When all fields are completed click "Get started".</p>
          <button className="admin-button"
            onClick={event => submitForm(event)}
          >Get started</button>
        </div>
      </div>
    </form>
  )
}

export default Admin 