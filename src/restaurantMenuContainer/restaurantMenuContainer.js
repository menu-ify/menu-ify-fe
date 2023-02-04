import React, {useEffect, useState} from "react";
import { getRestaurants } from "../apiCalls";

const RestaurantMenuContainer = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(()=> {
    getRestaurants().then(data=> {
      console.log("DATA", data)
      setRestaurants(data)})
  }, [])

  return (
    <section>
      <h1>restaurantMenuContainer</h1>
    </section>
  )
}

export default RestaurantMenuContainer