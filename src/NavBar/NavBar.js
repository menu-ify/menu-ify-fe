import "./NavBar.css"
import React, { useState } from "react"
import Dropdown from "../Dropdown/Dropdown"

export default function NavBar() {
  const [menuStatus, setMenuStatus] = useState(false)
  // maybe this should use our Redux store to track the menu's open/close state, navlinks, etc since navbar is visible on all app pages

  // const restaurantName = "Menuify"

const closeModal = () => {
 if (menuStatus) {
  setMenuStatus(!menuStatus)
 }
}

  return (
    <>
      <div className="frame" onClick={() => closeModal()}>
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
          <h1 className="name1">Menu</h1><h1 className="name2">ify</h1>
        </div>

      </div>
    </>
  )
}