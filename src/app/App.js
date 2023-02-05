import React, { useEffect, useState } from 'react';
// import logo from '../../src/logo.svg'
// import { Counter } from '../features/counter/Counter';
import './App.css';
import RestaurantPreviewContainer from '../RestaurantPreviewContainer/RestaurantPreviewContainer';
import { getRestaurants } from "../apiCalls";


const App = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(()=> {
    getRestaurants().then(data => {
      console.log("DATA", data.data)
      setRestaurants(data.data)})
  }, [])
  return (
    <div className="App">
      <h1>TEST</h1>
      <RestaurantPreviewContainer restaurants={restaurants}/>
    </div>
  );
}

export default App;
