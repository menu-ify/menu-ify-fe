import React, { useState, useEffect } from 'react'
import "./AddMenuItem.css"
import MenuItems from '../MenuItems/MenuItems'

export default function AddMenuItem() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [search, setSearch] = useState('')
  const [image, setImage] = useState('')

  return (
    <div className="add-item-container">
      <header>
        Add to your menu:
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
          <button>Search</button>
        </div>
        <div className="search-results">
          
        </div>
        <MenuItems name={name} description={description} image={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pictograms-nps-food_service.svg/640px-Pictograms-nps-food_service.svg.png"} price={price}/>
      </form>
    </div>
  )
}