import React from "react";
import RestaurantPreviewCard from "../RestaurantPreviewCard/RestaurantPreviewCard";
import './RestaurantPreviewContainer.css'

const RestaurantPreviewContainer = ({restaurants}) => {
  const restaurantsArray = restaurants.map(restaurant => {
    return (
      <RestaurantPreviewCard
        key = {restaurant.id}
        restaurantName = {restaurant.attributes.name}
        restaurantDescription = {restaurant.attributes.description}
        restaurantLogo = {restaurant.attributes.logo}
      />
    )
  })
  return (
    <section className="restaurantMenuContainer">
      <h1 className="rpc-title">Welcome! 👋</h1>
      <p className="rpc-instructions">Select a restaurant to get started</p>
      {restaurantsArray}
    </section>
  )
}
export default RestaurantPreviewContainer