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
  const [image, setImage] = useState('')

  useEffect(() => {
    if (images) return;

    getData('https://menu-ify-be.herokuapp.com/api/v1/restaurants')
    .then(data => {
      setImages(data)
    })
  })

  const searchImages = async (search, images) => {
    const data = await images

    return images.forEach(image => {
      if (image.attributes.description.includes(search)) {
        return <img id={image.id} src={image.attributes.logo} alt={image.attributes.description} />
      }
    })
  }

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
              .then(() => {
                return searchImages(search, images)
              })
          }}></input>
          <button>Search</button>
        </div>
        <div className="search-results">
          {}
        </div>
        <MenuItems name={name} description={description} image={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png"} price={price}/>
      </form>
    </div>
  )
}