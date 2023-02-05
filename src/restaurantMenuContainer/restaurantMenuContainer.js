import React from "react";

import MenuPreviewCard from "../menuPreviewCard/MenuPreviewCard";
import './RestaurantMenuContainer.css'

const RestaurantMenuContainer = ({restaurants}) => {

  const restaurantsArray = restaurants.map(restaurant => {
    return (
      <MenuPreviewCard
        key = {restaurant.attributes.id}
        restaurantName = {restaurant.attributes.name}
        restaurantDescription = {restaurant.attributes.description}
        restaurantLogo = {restaurant.attributes.logo}
      />
    )
  })
  return (
    <section className="restaurantMenuContainer">
      <h1>Welcome! 👋</h1>
      <p>Select a restaurant to get started</p>
      {restaurantsArray}
    </section>
  )
}

export default RestaurantMenuContainer