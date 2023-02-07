import "./NavBar.css"
import React, { useState } from "react"
import Dropdown from "../Dropdown/Dropdown"

export default function NavBar() {
  const [menuStatus, setMenuStatus] = useState(false)
  // maybe this should use our Redux store to track the menu's open/close state, navlinks, etc since navbar is visible on all app pages

  const restaurantName = "Testaurant Name"

  return (
    <>
      <div className="frame">
        <header className="name">{restaurantName}</header>
        <button className="menu" onClick={() => {
          console.log('click')
          setMenuStatus(!menuStatus)
        }}>
          {!menuStatus && <span className="material-symbols-outlined icon">
            menu
          </span>
          }
          {menuStatus && <span className="material-symbols-outlined icon">
            close
          </span>
          }
        </button>
        {menuStatus && <Dropdown />}
      </div>
    </>
  )
}