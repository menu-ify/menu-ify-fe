import React, { NavLink } from "react-router-dom"
import "./Dropdown.css"

// This component will need access to the data storing all menus so it can update them dynamically.

export default function Dropdown({ restaurants }) {
  const restaurantLinks = restaurants.map((restaurant) => {
    return (
      <NavLink key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
        <li className="dropdown__menu-item">
          <button
            className="dropdown__button"
          >
            <i>{restaurant.attributes.name}</i>
          </button>
        </li>
      </NavLink>
    )
  })

  return (
    <ul className="dropdown">
      <NavLink to={`/`}>
        <li className="dropdown__menu-item">
          <button className="dropdown__button" onClick={() => {
          }}>
            <big><b style={{ letterSpacing: '4px' }}>All restaurants</b></big>
          </button>
        </li>
      </NavLink>

      {restaurantLinks}

      {/* <NavLink to={`/admin`}> */}
        <li className="dropdown__menu-item">
          <button className="dropdown__button" onClick={() => {
          }}>
            <big><b style={{ letterSpacing: '4px' }}>Admin | Login</b></big>
          </button>
        </li>
      {/* </NavLink> */}

      <NavLink to="/admin/add-menu-item">
        <li className="dropdown__menu-item">
          <button
            className="dropdown__button"
          >
            <i>Add menu item</i>
          </button>
        </li>
      </NavLink>

      <NavLink to="/admin/delete">
        <li className="dropdown__menu-item">
          <button
            className="dropdown__button"
          >
            <i>Delete menu item</i>
          </button>
        </li>
      </NavLink>

      <NavLink to="/admin/restaurant">
        <li className="dropdown__menu-item">
          <button
            className="dropdown__button"
          >
            <i>Add or delete restaurant</i>
          </button>
        </li>
      </NavLink>


    </ul>
  )
}