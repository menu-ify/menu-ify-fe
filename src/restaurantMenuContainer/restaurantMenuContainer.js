import React, {useEffect, useState} from "react";
import { getRestaurants } from "../apiCalls";

const RestaurantMenuContainer = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(()=> {
    getRestaurants().then(data=> {
      console.log("DATA", data.data)
      setRestaurants(data.data)})
  }, [])

  return (
    <section>
      <h1>RestaurantMenuContainer</h1>
    </section>
  )
}

export default RestaurantMenuContainer