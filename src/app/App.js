import React, { useEffect, useState } from 'react'
import './App.css'
import RestaurantPreviewContainer from '../RestaurantPreviewContainer/RestaurantPreviewContainer'
import Menu from '../Menu/Menu'
import { getData } from "../apiCalls"
import { Route, Routes, useLocation } from 'react-router-dom'
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
  const [logo, setLogo] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const location = useLocation()
  let menuNavActive = location.pathname.includes('/restaurant/') && logo

  useEffect(() => {
    getData(URLRestaurants)
      .then(data => {
        setRestaurants(data.data)
        setMessage('')
      })
      .catch(error => {
        setMessage(`${error.message}: try refreshing the page`)
        console.log("Fetch error: ", error)
      })
  }, [])


  return (
    <main className="App"
    style={{ backgroundColor: menuNavActive  && 'rgba(0, 0, 0, 0.87)' }}
    >
      {message &&
        <div className="restaurant-admin-error-message text-container">
          {message}
        </div>}
      <NavBar
        restaurants={restaurants}
        logo={logo}
        restaurantName={restaurantName}
        menuNavActive={menuNavActive}
      />
      <Routes>
        <Route path="/"
          element={<RestaurantPreviewContainer restaurants={restaurants} />}
        />
        <Route path="/restaurant/:id"
          element={<Menu
            setLogo={setLogo}
            setRestaurantName={setRestaurantName}
            restaurants={restaurants}
            setAdminSelections={setAdminSelections}
          />}
        />
        <Route path="/admin/add-menu-item"
          element={<AddMenuItem
            adminSelections={adminSelections}
            restaurants={restaurants} />}
        />
        <Route path="/admin/delete"
          element={<DeleteMenuItem restaurants={restaurants} />}
        />
        <Route path="/admin/restaurant"
          element={<RestaurantAdmin
            restaurants={restaurants}
            setRestaurants={setRestaurants}
            URLRestaurants={URLRestaurants} />}
        />
        <Route path="/*" element={<NotFound />} status={404} />
      </Routes>
    </main>)
}

export default App
