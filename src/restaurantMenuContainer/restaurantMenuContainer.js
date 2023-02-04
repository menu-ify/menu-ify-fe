import React, {useEffect, useState} from "react";
import { getRestaurants } from "../apiCalls";
import MenuPreviewCard from "../MenuPreviewCard/MenuPreviewCard";

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
        restaurantName = {restaurant.attributes.name}
        restaurantDescription = {restaurant.attributes.description}
        restaurantLogo = {restaurant.attributes.logo}
      />
    )
  })
  return (
    <section>
      <h1>RestaurantMenuContainer</h1>
      {restaurantsArray}
    </section>
  )
}

export default RestaurantMenuContainer