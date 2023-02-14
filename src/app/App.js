import React, { useEffect, useState } from 'react'
import './App.css'
import RestaurantPreviewContainer from '../RestaurantPreviewContainer/RestaurantPreviewContainer'
import Menu from '../Menu/Menu'
import { getData } from "../apiCalls"
import { Route, Routes } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import NavBar from '../NavBar/NavBar'
import DeleteMenuItem from '../DeleteMenuItem/DeleteMenuItem'
import AddMenuItem from '../AddMenuItem/AddMenuItem'
import RestaurantAdmin from '../RestaurantAdmin/RestaurantAdmin'

const URLRestaurants = "https://menu-ify-be.herokuapp.com/api/v1/restaurants"

const App = () => {
  const [restaurants, setRestaurants] = useState([])
  const [adminSelections, setAdminSelections] = useState({})
  const [message, setMessage] = useState("")
  useEffect(() => {
    getData(URLRestaurants)
      .then(data => {
        console.log('RESTAURANTS', data)
        setRestaurants(data.data)
        setMessage('')
      })
      .catch(error => {
        console.log("Fetch error: ", error)
        setMessage(`${error.message}: try refreshing the page`)
      })
  }, [])


  useEffect(() => {
    getData(URLRestaurants)
      .then(data => {
        setRestaurants(data.data)
      })
  }, []) // Add this line to make sure the hook runs whenever the `restaurants` state changes


  return (
    <main className="App">
      {message &&
        <div className="restaurant-admin-error-message text-container">
          {message}
        </div>}
      <NavBar restaurants={restaurants} />
      <Routes>
        <Route path="/"
          element={<RestaurantPreviewContainer restaurants={restaurants} />}
        />
        <Route path="/restaurant/:id"
          element={<Menu
            setMessage={setMessage}
            restaurants={restaurants}
          />}
        />
        <Route path="/admin/add-menu-item"
          element={<AddMenuItem adminSelections={adminSelections} restaurants={restaurants} />}
        />
        <Route path="/admin/delete"
          element={<DeleteMenuItem restaurants={restaurants} />}
        />
        <Route path="/admin/restaurant"
          element={<RestaurantAdmin setAdminSelections={setAdminSelections} restaurants={restaurants} setRestaurants={setRestaurants} URLRestaurants={URLRestaurants} />}
        />
        {/* <Route path="/admin"
              element={<Admin setAdminSelections={setAdminSelections} restaurants={restaurants} />}
            /> */}
        <Route path="/*" element={<NotFound />} status={404} />
      </Routes>
    </main>
  )
}

export default App
