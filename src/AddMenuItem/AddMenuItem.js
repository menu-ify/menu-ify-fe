import React, { useState, useEffect } from 'react'
import "./AddMenuItem.css"
import MenuItems from '../MenuItems/MenuItems'
import { getData } from '../apiCalls'

export default function AddMenuItem() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [search, setSearch] = useState('')
  const [images, setImages] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [image, setImage] = useState('')

  useEffect(() => {
    if (images) return;

    getData('https://menu-ify-be.herokuapp.com/api/v1/restaurants')
      .then(data => {
        setImages(data)
      })
      .then(() => {
        console.log(images)
      })
  })

  useEffect(() => {
    if (!images) {
      setSearchResults(<p>Error loading preview images, please refresh.</p>)
    };

    if (images) {
      const isImagesArray = Array.isArray(images)
      console.log('images is firing and is equal to:', images, 'isArray() equals', isImagesArray)

      setSearchResults(
        images.data.map(image => {
          if (image.attributes.description.includes(search)) {
            return <img key={image.id} id={image.id} src={image.attributes.logo} alt={image.attributes.description} onClick={(e) => {
              setImage(e.target.id)
                .then(console.log(image))
            }} />
          }
        })
      )
    }
  }, [search])

  return (
    <div className="add-item-container">
      <header>
        Build a new menu item:
      </header>
      <form className="form">
        <input name="name" type="text" placeholder="Enter name..." value={name} onChange={(e) => {
          setName(e.target.value)
        }}></input>
        <input name="description" type="text" placeholder="Enter description..." value={description} onChange={(e) => {
          setDescription(e.target.value)
        }}></input>
        <input name="price" type="text" placeholder="Enter price..." onChange={(e) => {
          setPrice(e.target.value)
        }}></input>
        <div>
          <input name="search" type="text" placeholder="Search for image..." onChange={(e) => {
            setSearch(e.target.value)
          }}></input>
        </div>
        <div className="search-results">
          {searchResults}
        </div>
        <MenuItems name={name} description={description} image={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png"} price={price}/>
      </form>
    </div>
  )
}