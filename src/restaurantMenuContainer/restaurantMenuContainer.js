import React, {useEffect, useState} from "react";
import { getRestaurants } from "../apiCalls";
import MenuPreviewCard from "../MenuPreviewCard/MenuPreviewCard";
import './RestaurantMenuContainer.css'

const RestaurantMenuContainer = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(()=> {
    getRestaurants().then(data=> {
      console.log("DATA", data.data)
      setRestaurants(data.data)})
  }, [])

  const restaurantsArray = restaurants.map(restaurant => {
    return (
      <MenuPreviewCard
        key= {restaurant.attributes.id}
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