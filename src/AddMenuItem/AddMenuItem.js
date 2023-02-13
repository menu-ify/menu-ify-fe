import React, { useState, useEffect } from 'react'
import "./AddMenuItem.css"
import MenuItems from '../MenuItems/MenuItems'
import { getData } from '../apiCalls'
import { useDispatch } from "react-redux"
import { addMenuItemAsync } from "../features/menu/menuSlice"
// import { postData } from '../apiCalls'

export default function AddMenuItem({ adminSelections, restaurants }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [search, setSearch] = useState('')
  const [images, setImages] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png')
  const [category, setCategory] = useState('')
  const [confirmModal, setConfirmModal] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const restaurantName = adminSelections.selectedRestaurant
  let restaurantId = adminSelections.restaurantId
  const [message, setMessage] = useState('')
  // const selectedRestaurantId = () => {
  //   if (selectedRestaurant === "Pho Kyah") {
  //     return 100
  //   } else if (selectedRestaurant === "Tim's Tiki Bar") {
  //     return 200
  //   } else {
  //     return 300
  //   }
  // }
  const getRestaurantId = (restaurantName) => {
    for (const restaurant of restaurants) {
      if (restaurant.attributes.name === restaurantName) {
        return restaurant.id
      }
    }
    return null
  }

  const restaurantOptions = () => {
    return restaurants.map((restaurant) => {
      return (
        <option
          key={restaurant.id}
        >
          {restaurant.attributes.name}
        </option>
      )
    })
  }

  const clearForm = () => {
    setName('')
    setPrice('')
    setDescription('')
    setSearch('')
    setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png')
  }

  const submitNewItem = (event) => {
    event.preventDefault()
    if (!restaurantId) {
      restaurantId = getRestaurantId(selectedRestaurant)
    }
    if (
      name &&
      description &&
      price >= 0 &&
      image &&
      category &&
      category !== "Category..." &&
      restaurantId
    ) {
      const newMenuItem = {
        name: name,
        description: description,
        tags: "No tags added",
        category: category,
        image: image,
        price: price,
      }
      dispatch(addMenuItemAsync(newMenuItem, restaurantId))
      clearForm()
      setMessage('Menu item added! 🎉')
      setConfirmModal(true)
      window.scrollTo(0, 0)
    } else {
      setMessage('Hmmm... 🧐 There appears to be an issue. Please ensure all fields are complete. NOTE: Price field must be a number.')
      setConfirmModal(true)
      window.scrollTo(0, 0)
    }
  }

  const getSearchResults = async (event) => {
    event.preventDefault()

    console.log(search)

    getData(`https://menu-ify-fastapi.herokuapp.com/photos/${search}`)
      .then(data => {
        setImages(data)
        console.log('fetch results', data)
        return data
      })
      .then(data => {
        if (data.results.length > 0) {
          setSearchResults(data.results.map((image, index) => {
            return <img className="image-preview" key={index} id={index} src={image} alt={`search result for "${search}"`} onClick={() => {
              setImage(image)
            }} />
         }))
        } else {
          setSearchResults(<p>No Results Found</p>)
        }
      })
  }

  return (
    <div className="add-item-container">
      <h2 className="rpc-title">Admin View</h2>
      <h3 className="rpc-instructions">
        Build a new menu item for {restaurantName}:
      </h3>
      <form className="form">

        {!restaurantId && <div className="add-select">
          <select className="form-select"
            value={selectedRestaurant}
            onChange={event => setSelectedRestaurant(event.target.value)}
          >
            <option>Restaurant</option>
            {restaurantOptions()}
          </select>
        </div>}


        <div className="add-select">

          <select
            className="form-select"
            value={category}
            onChange={event => setCategory(event.target.value)}
          >
            <option>Category...</option>
            <option>appetizer</option>
            <option>entree</option>
            <option>draft beer</option>
            <option>cocktail</option>

          </select>

        </div>

        <input className="form__input" name="name" type="text" placeholder="Enter name..." value={name} onChange={(e) => {
          setName(e.target.value)
        }}></input>


        <input className="form__input" name="price" type="number" placeholder="Enter number for price..." value={price} onChange={(e) => {
          setPrice(e.target.value)
        }}></input>

        <input className="form__input" name="description" type="text" placeholder="Enter description..." value={description} onChange={(e) => {
          setDescription(e.target.value)
        }}></input>

        <input className="form__input" name="search" type="text" placeholder="Search for image..." value={search} onChange={(e) => {
          setSearch(e.target.value)
        }}></input>

        <div className='search-button-container'>
          <button className='search-button' onClick={(event) => {getSearchResults(event)}}>Start image search</button>
        </div>

        <h3 className="form-header">Search results</h3>
        <div className="search-results">
          {images && searchResults}
        </div>

        <h3>Preview</h3>

        <MenuItems name={name} description={description} image={image} price={price} />

        <div className="search-button-container">
          <button className="search-button" onClick={(event) => { submitNewItem(event) }}>Add new menu item</button>
        </div>

      </form>

      {confirmModal &&
        <div className="confirm-modal">
          <p>{message}</p>
          <button
            className="admin-button"
            onClick={() => { setConfirmModal(false) }}>Close
          </button>
        </div>}

    </div>
  )
}