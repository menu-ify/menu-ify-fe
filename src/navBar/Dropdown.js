import React from "react"
import "./dropdown.css"

// This component will need access to the data storing all menus so it can update them dynamically.

export default function Dropdown() {
  return (
    <ul className="dropdown">
      <li className="dropdown__menu-item">
        <button className="dropdown__button" onClick={() => {
          console.log('Home clicked')
        }}>
          Home
        </button>
      </li>
      <li className="dropdown__menu-item">
        <button className="dropdown__button" onClick={() => {
          console.log('Admin clicked')
        }}>
          Admin
        </button>
      </li>
      <li className="dropdown__menu-item">
        <button className="dropdown__button" onClick={() => {
          console.log('Menu 1 clicked')
        }}>
          Menu 1
        </button>
      </li>
      <li className="dropdown__menu-item">
        <button className="dropdown__button" onClick={() => {
          console.log('Menu 2 clicked')
        }}>
          Menu 2
        </button>
      </li>
      <li className="dropdown__menu-item">
        <button className="dropdown__button" onClick={() => {
          console.log('Menu 3 clicked')
        }}>
          Menu 3
        </button>
      </li>
    </ul>
  )
}