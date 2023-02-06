import React from "react"
import './MenuItems.css'

const MenuItems = ({ key, name, description, image, price }) => {
  return (
    <section className="menu-item-container">
      <div className="menu-image-container">
        <img src={image} alt={name} className="menu-item-image" />
      </div>
      <div className="menu-item-container-info">
        <p className="menu-item-name">{name} - ${price}</p>
        <p className="menu-item-description">{description}</p>
      </div>

    </section>
  )
}
export default MenuItems