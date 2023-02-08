import "./NavBar.css"
import React, { useState } from "react"
import Dropdown from "../Dropdown/Dropdown"

export default function NavBar() {
  const [menuStatus, setMenuStatus] = useState(false)

  const restaurantName = "Menuify"

  return (
    <>
      <div className="frame">
        <div className="button-container">
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
        </div>
        {menuStatus && <Dropdown />}

        <div className="nav-title-container">
          <header className="name">{restaurantName}</header>
        </div>

      </div>
    </>
  )
}