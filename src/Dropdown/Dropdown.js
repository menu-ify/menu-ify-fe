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
          // onClick={() => {}}
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

      <NavLink to={`/admin`}>
        <li className="dropdown__menu-item">
          <button className="dropdown__button" onClick={() => {
            console.log('Admin clicked')
          }}>
            <big><b style={{ letterSpacing: '4px' }}>Admin</b></big>
          </button>
        </li>
      </NavLink>
      
    </ul>
  )
}