import React, {useEffect, useState} from 'react';
// import logo from '../../src/logo.svg'
// import { Counter } from '../features/counter/Counter';
import './App.css';
import { getRestaurants } from "../apiCalls";
import RestaurantMenuContainer from '../restaurantMenuContainer/RestaurantMenuContainer.js';


const App = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(()=> {
    getRestaurants().then(data => {
      console.log("DATA", data.data)
      setRestaurants(data.data)})
  }, [])
  return (
    <div className="App">
      <RestaurantMenuContainer restaurants={restaurants}/>
    </div>
  );
}

export default App;
