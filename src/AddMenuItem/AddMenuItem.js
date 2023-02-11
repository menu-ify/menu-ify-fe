import React, { useState, useEffect } from 'react'
import "./AddMenuItem.css"
import MenuItems from '../MenuItems/MenuItems'
import { getData } from '../apiCalls'
// import { postData } from '../apiCalls'

export default function AddMenuItem({ adminSelections }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [search, setSearch] = useState('')
  const [images, setImages] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png')
  const [confirmModal, setConfirmModal] = useState(false)
  const restaurantName = adminSelections.selectedRestaurant

  const clearForm = () => {
    setName('')
    setPrice('')
    setDescription('')
    setSearch('')
    setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png')
  }

  const submitNewItem = (event) => {
    event.preventDefault()
    // first, update Redux store with new item
    // then, post new store to backend to update menu
    //       modal could have loading animation during this time?
    // when response is recieved, display modal text confirming menu update and clear form
    clearForm()
    setConfirmModal(true)
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
            placeholder='Restaurant'
            className="form-select"
          >
            <option> Category...</option>
          </select>

        </div>

        <input className="form__input" name="name" type="text" placeholder="Enter name..." value={name} onChange={(e) => {
          setName(e.target.value)
        }}></input>



        <input className="form__input" name="price" type="text" placeholder="Enter price..." value={price} onChange={(e) => {
          setPrice(e.target.value)
        }}></input>

        <input className="form__input" name="description" type="text" placeholder="Enter description..." value={description} onChange={(e) => {
          setDescription(e.target.value)
        }}></input>

        <input className="form__input" name="search" type="text" placeholder="Search for image..." value={search} onChange={(e) => {
          setSearch(e.target.value)
        }}></input>

        <div className='search-button-container'>
          <button className='search-button'>Start search</button>
        </div>

        <h3 className="form-header">Search results</h3>
        <div className="search-results">
          {searchResults}
        </div>

        <h3>Preview</h3>
        <MenuItems name={name} description={description} image={image} price={price} />
        <button className="admin-button" onClick={(event) => { submitNewItem(event) }}>Add new menu item</button>
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