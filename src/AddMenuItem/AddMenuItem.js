import React, { useState, useEffect } from 'react'
import "./AddMenuItem.css"
import MenuItems from '../MenuItems/MenuItems'
import { getData } from '../apiCalls'
import { useDispatch } from "react-redux"
import { addMenuItemAsync } from "../features/menu/menuSlice"
// import { postData } from '../apiCalls'

export default function AddMenuItem({ adminSelections }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [search, setSearch] = useState('')
  const [images, setImages] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png')
  const [category, setCategory] = useState('')
  const [confirmModal, setConfirmModal] = useState(false)
  const restaurantName = adminSelections.selectedRestaurant
  const restaurantId =  adminSelections.restaurantId
  // console.log("restaurantId", restaurantId.restaurantId)

  const clearForm = () => {
    setName('')
    setPrice('')
    setDescription('')
    setSearch('')
    setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png')
  }

  const submitNewItem = (event) => {
    event.preventDefault()
    //error handle that everything is completed
    if (
      name &&
      description &&
      // price !== 0 &&
      price >= 0 &&
      image &&
      category &&
      category !== "Category..." &&
      restaurantId
    ) {
      // first, update Redux store with new item

      const newMenuItem = {
        name: name,
        description: description,
        tags: "No tags added",
        category: category, 
        image: image,
        price: price,
      }
      console.log("REST ID",restaurantId)
      dispatch(addMenuItemAsync(newMenuItem, restaurantId))
      // then, post new store to backend to update menu
      //       modal could have loading animation during this time?
      // when response is recieved, display modal text confirming menu update and clear form
      clearForm()
      setConfirmModal(true)
    } else {
      console.log("ADD ITEM FORM IS NOT COMPLETE")
    }
  }

  useEffect(() => {
    if (images) return

    getData('https://menu-ify-be.herokuapp.com/api/v1/restaurants')
      .then(data => {
        console.log('attempted to fetch AddMenuItem preview images', data)
        setImages(data)
      })
  })

  useEffect(() => {
    if (!images) {
      setSearchResults(<p>Error loading preview images, please refresh.</p>)
    };

    if (images) {
      const filteredSearch = images.data.filter(image => {
        return image.attributes.description.includes(search)
      })

      console.log('filteredSearch:', filteredSearch)

      if (filteredSearch.length > 0) {
        setSearchResults(filteredSearch.map(image => {
          return <img className="image-preview" key={image.id} id={image.id} src={image.attributes.logo} alt={image.attributes.description} onClick={() => {
            setImage(image.attributes.logo)
          }} />
        }))
      }
      else {
        setSearchResults(<p>No results</p>)
      }
    }
  }, [search, images])

  return (
    <div className="add-item-container">
      <h2 className="rpc-title">Admin View</h2>
      <h3 className="rpc-instructions">
        Build a new menu item for {restaurantName}:
      </h3>
      <form className="form">

        <div className="add-select">

          {/* <select

            placeholder='Restaurant'
            className="form-select"
          >
            <option>Restaurant...</option>
          </select> */}

          <select
            className="form-select"
            value={category}
            onChange={event => setCategory(event.target.value)}
          >
            <option> Category...</option>
            <option> appetizer</option>
            <option> entree</option>
            <option> draft beer</option>
            <option> cocktail</option>

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
          <button className='search-button'>Start image search</button>
        </div>

        <h3 className="form-header">Search results</h3>
        <div className="search-results">
          {searchResults}
        </div>

        <h3>Preview</h3>
        <MenuItems name={name} description={description} image={image} price={price} />
        <div className="search-button-container">
          <button className="admin-button" onClick={(event) => { submitNewItem(event) }}>Add new menu item</button>
        </div>
      </form>

      {confirmModal &&
        <div className="confirm-modal">
          <p>Menu item submitted!</p>
          <button
            className="admin-button"
            onClick={() => { setConfirmModal(false) }}>Close
          </button>
        </div>}

    </div>
  )
}