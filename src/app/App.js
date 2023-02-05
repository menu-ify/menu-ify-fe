import React, { useEffect, useState } from 'react'
// import logo from '../../src/logo.svg'
// import { Counter } from '../features/counter/Counter';
import './App.css'
import RestaurantPreviewContainer from '../RestaurantPreviewContainer/RestaurantPreviewContainer'
import { getRestaurants } from "../apiCalls"
import { Route, Routes } from 'react-router-dom'


const App = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    getRestaurants().then(data => {
      console.log("DATA", data.data)
      setRestaurants(data.data)
    })
  }, [])
  return (
    <main className="App">
      <h1 className="app-title">Menu-ify</h1>
      <Routes>
        <Route path="/"
          element={<RestaurantPreviewContainer restaurants={restaurants} />}
          />
      </Routes>
    </main>
  )
}

export default App
