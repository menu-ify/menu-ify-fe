import React, { useState, useEffect } from 'react'
import "./AddMenuItem.css"
import MenuItems from '../MenuItems/MenuItems'
import { getData, postData } from '../apiCalls'

export default function AddMenuItem() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [search, setSearch] = useState('')
  const [images, setImages] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png')
  const [confirmModal, setConfirmModal] = useState(false)

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
    if (images) return;

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
      <header>
        Build a new menu item:
      </header>
      <form className="form">
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
        <p className="form-header">Search Results</p>
        <div className="search-results">
          {searchResults}
        </div>
        <p></p>
        <MenuItems name={name} description={description} image={image} price={price}/>
        <button onClick={(event) => {submitNewItem(event)}}>Submit New Item</button>
      </form>
      {confirmModal && <div className="confirm-modal"><p>Menu item submitted!</p><button onClick={() => {setConfirmModal(false)}}>Close</button></div>}
    </div>
  )
}