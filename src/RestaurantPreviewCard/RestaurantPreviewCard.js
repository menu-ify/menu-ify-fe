import React from "react"
import "../RestaurantPreviewCard/RestaurantPreviewCard.css"
import { NavLink } from "react-router-dom"

const RestaurantPreviewCard = ({ restaurantName, restaurantDescription, restaurantLogo, id }) => {
  return (
    <section className="card-container">
      <div className="restaurant-image-container">
        <img src={restaurantLogo} alt={restaurantName} className="restaurant-image" />
      </div>
      <NavLink to={`/restaurant/${id}`} className="nav-link">
        <h2 className="RPC-title">{restaurantName}</h2>
      </NavLink>
      <p className="RPC-description">{restaurantDescription}</p>
    </section>
  )
}

export default RestaurantPreviewCard