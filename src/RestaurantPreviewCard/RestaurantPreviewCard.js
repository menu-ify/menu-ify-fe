import React from "react"
import "../RestaurantPreviewCard/RestaurantPreviewCard.css"

const RestaurantPreviewCard = ({ restaurantName, restaurantDescription, restaurantLogo }) => {

  return (
    <section className="card-container">
      <div className="restaurant-image-container">
        <img src={restaurantLogo} alt={restaurantName} className="restaurant-image" />
      </div>
      <h2 className="RPC-title">{restaurantName}</h2>
      <p className="RPC-description">{restaurantDescription}</p>
    </section>
  )
}

export default RestaurantPreviewCard