import React, { useState } from "react"
// import { useHistory } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../Admin/Admin.css"

const Admin = ({ setAdminSelections }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const [selectedAction, setSelectedAction] = useState("")
  const navigate = useNavigate()
  const restaurantId = () => {
    if (selectedRestaurant === "Pho Kyah") {
      return 100
    } else if (selectedRestaurant === "Tim's Tiki Bar") {
      return 200
    } else {
      return 300
    }
  }

  const submitForm = (event) => {
    event.preventDefault()
    console.log("MADE IT TO SUBMIT FORM")
    if (
      selectedRestaurant === "None selected" ||
      selectedAction === "None selected" ||
      !selectedRestaurant ||
      !selectedAction
    ) {
      // we might use the error component here
      console.log("Admin form is not complete")
    } else if (selectedAction === "Add new menu item") {
      console.log("Add new")
      setAdminSelections(
        {
          selectedRestaurant: selectedRestaurant,
          selectedAction: selectedAction,
          restaurantId: restaurantId()
        })
      navigate("/admin/add-menu-item")
    } else {
      console.log("Delete existing")
      setAdminSelections(
        {
          selectedRestaurant: selectedRestaurant,
          selectedAction: selectedAction,
          restaurantId: restaurantId()
        })
      navigate("/admin/delete")
    }
    console.log("ADMIN ADMIN SELECGTIONS", { selectedRestaurant: selectedRestaurant, selectedAction: selectedAction, restaurantId: restaurantId() })
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
              <option>None selected</option>
              <option>Pho Kyah</option>
              <option>Tim's Tiki Bar</option>
              <option>Ruthy's</option>
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