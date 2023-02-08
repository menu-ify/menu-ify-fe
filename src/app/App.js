import React, { useEffect, useState } from 'react'
// import { Counter } from '../features/counter/Counter';
import './App.css'
import RestaurantPreviewContainer from '../RestaurantPreviewContainer/RestaurantPreviewContainer'
import Menu from '../Menu/Menu'
import { getData } from "../apiCalls"
import { Route, Routes } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import NavBar from '../NavBar/NavBar'

//const URLMenuItems = "https://a1ecae6b-2320-4cd4-91ed-7da641c93480.mock.pstmn.io/api/v1/restaurants/:restaurant_id/menu_items"
const URLRestaurants = "https://a1ecae6b-2320-4cd4-91ed-7da641c93480.mock.pstmn.io//api/v1/restaurants"

const App = () => {
  const [restaurants, setRestaurants] = useState([])
  // const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    getData(URLRestaurants).then(data => {
      console.log('RESTAURANTS', data)
      setRestaurants(data.data)
    })

    // getData(URLMenuItems).then(data => {
    //   console.log("MENU ITEMS", data)
    //   setMenuItems(data.data)
    // })
  }, [])

  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/"
          element={<RestaurantPreviewContainer restaurants={restaurants} />}
        />
        <Route path="/restaurant/:id"
          element={<Menu restaurants={restaurants}/>}
        />
        <Route path="/*" element={<NotFound />} status={404}/>
      </Routes>
    </main>
  )
}

export default App
