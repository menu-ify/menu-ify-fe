import React from "react";
import './MenuItems.css'

const MenuItems = ({key, name, description, image, price}) => {
  return (
    <section>
      <img src={image} alt={name}/>
      <p>{name}</p>
      <p>${price}</p>
      <p>{description}</p>

    </section>
  )
}
export default MenuItems