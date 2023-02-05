import React from "react";
import MenuPreviewCard from "../MenuPreviewCard/MenuPreviewCard";
import './RestaurantPreviewContainer.css'

const RestaurantPreviewContainer = ({restaurants}) => {
  const restaurantsArray = restaurants.map(restaurant => {
    return (
      <MenuPreviewCard
        key = {restaurant.id}
        restaurantName = {restaurant.attributes.name}
        restaurantDescription = {restaurant.attributes.description}
        restaurantLogo = {restaurant.attributes.logo}
      />
    )
  })
  return (
    <section className="restaurantMenuContainer">
      <h1>Welcome!</h1>
      <p>Select a restaurant to get started</p>
      {restaurantsArray}
    </section>
  )
}
export default RestaurantPreviewContainer