import "./NavBar.css"
import React, { useState } from "react"
import Dropdown from "../Dropdown/Dropdown"

export default function NavBar() {
  const [menuStatus, setMenuStatus] = useState(false)

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