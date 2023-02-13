import React, { useEffect, useState } from 'react'
import './App.css'
import RestaurantPreviewContainer from '../RestaurantPreviewContainer/RestaurantPreviewContainer'
import Menu from '../Menu/Menu'
import { getData } from "../apiCalls"
import { Route, Routes } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import NavBar from '../NavBar/NavBar'
import Admin from "../Admin/Admin"
import DeleteMenuItem from '../DeleteMenuItem/DeleteMenuItem'
import AddMenuItem from '../AddMenuItem/AddMenuItem'
import RestaurantAdmin from '../RestaurantAdmin/RestaurantAdmin'

//const URLMenuItems = "https://a1ecae6b-2320-4cd4-91ed-7da641c93480.mock.pstmn.io/api/v1/restaurants/:restaurant_id/menu_items"
const URLRestaurants = "https://menu-ify-be.herokuapp.com/api/v1/restaurants"

const App = () => {
  const [restaurants, setRestaurants] = useState([])
  const [adminSelections, setAdminSelections] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    getData(URLRestaurants)
      .then(data => {
        console.log('RESTAURANTS', data)
        setRestaurants(data.data)
        setError('')
      })
      .catch(error => {
        console.log("Fetch error: ", error)
        setError(error)
      })
  }, [])


  useEffect(() => {
    getData(URLRestaurants)
      .then(data => {
        setRestaurants(data.data)
      })
  }, []) // Add this line to make sure the hook runs whenever the `restaurants` state changes


  return (
    <>
      {error ?
        (<NotFound />)
        : (<main className="App">
          <NavBar restaurants={restaurants} />
          <Routes>
            <Route path="/"
              element={<RestaurantPreviewContainer restaurants={restaurants} />}
            />
            <Route path="/restaurant/:id"
              element={<Menu
                error={error}
                setError={setError}
                restaurants={restaurants}
              />}
            />
            <Route path="/admin/add-menu-item"
              element={<AddMenuItem adminSelections={adminSelections} restaurants={restaurants} />}
            />
            <Route path="/admin/delete"
              element={<DeleteMenuItem adminSelections={adminSelections} />}
            />
            <Route path="/admin/restaurant"
              element={<RestaurantAdmin setAdminSelections={setAdminSelections} restaurants={restaurants} setRestaurants={setRestaurants} URLRestaurants={URLRestaurants} />}
            />
            {/* <Route path="/admin"
              element={<Admin setAdminSelections={setAdminSelections} restaurants={restaurants} />}
            /> */}
            <Route path="/*" element={<NotFound />} status={404} />
          </Routes>
        </main>)
      }
    </>
  )
}

export default App
