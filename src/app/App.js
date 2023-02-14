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
  const [error, setError] = useState('')

  useEffect(() => {
    getData(URLRestaurants)
      .then(data => {
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
  }, [])


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
              element={<DeleteMenuItem restaurants={restaurants}/>}
            />
            <Route path="/admin/restaurant"
              element={<RestaurantAdmin setAdminSelections={setAdminSelections} restaurants={restaurants} setRestaurants={setRestaurants} URLRestaurants={URLRestaurants} />}
            />
            <Route path="/*" element={<NotFound />} status={404} />
          </Routes>
        </main>)
      }
    </>
  )
}

export default App
