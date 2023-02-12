import React, { useState, useEffect } from "react"
import "../RestaurantAdmin/RestaurantAdmin.css"
import { postData, deleteData, getData } from "../apiCalls"


const RestaurantAdmin = ({ restaurants, setRestaurants, URLRestaurants }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [message, setMessage] = useState("")
  const [deleteMessage, setDeleteMessage] = useState("")

  // const updateRestaurants = () => {
  //   getData(URLRestaurants)
  //     .then(data => {
  //       console.log('RESTAURANTS', data)
  //       setRestaurants(data.data)
  
  //     })

  // }

  const restaurantDeleteCards = () => {
    return restaurants.map((restaurant) => {
      return (
        <div key={restaurant.id} className="delete-restaurant-card">
          <h3>{restaurant.attributes.name}</h3>
          <button
            id={restaurant.id}
            className="search-button"
            onClick={(event) => handleDelete(event)}
          >
            Delete
          </button>
        </div>
      )
    })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    let restaurantID = Number(event.target.id)
    console.log("RES ID", typeof restaurantID)
    deleteData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${restaurantID}`).then((response) => {
      if (!response) {
        setDeleteMessage
          ("Looks like you need to delete menu items before you can delete this restaurant")
        setTimeout(() => {
          clearInputs()
        }, 3000)
      } else {
        console.log("Restaurant deleted!")
        setDeleteMessage("Restaurant deleted!")
        setTimeout(() => {
          clearInputs()
        }, 3000)
      }
    })
  }



    const submitNewRestaurant = (event) => {
      event.preventDefault()
      if (name && description && link) {
        const newRestaurant = {
          name: name,
          description: description,
          logo: link,
        }
        console.log("NEW RESTAURANT", newRestaurant)
        setMessage("Restaurant added! 🎉")
        postData(newRestaurant, `https://menu-ify-be.herokuapp.com/api/v1/restaurants/`).then((response) => console.log("ADD RESTAURANT", response))
        setTimeout(() => {
          clearInputs()
        }, 3000)
        // updateRestaurants() 
      } else {
        setMessage("Error: Please check all fields and/or refresh.")
        setTimeout(() => {
          clearInputs()
        }, 3000)
      }
    }

    const clearInputs = () => {
      setName("")
      setDescription("")
      setLink("")
      setMessage("")
    }

    return (
      <section className="restaurantMenuContainer">
        <h2 className="rpc-title">Admin View</h2>
        <p className="rpc-instructions">Add a restaurant</p>

        <input
          value={name}
          onChange={(e) => { setName(e.target.value) }}
          placeholder="Enter name"
          className="form__input"
        >
        </input>

        <input
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
          placeholder="Enter description"
          className="form__input"
        >
        </input>

        <input
          value={link}
          onChange={(e) => { setLink(e.target.value) }}
          placeholder="Enter link to image"
          className="form__input"
        >
        </input>

        <section className="card-container preview-margin">
          <div className="restaurant-image-container">
            <img src={link} alt={name} className="restaurant-image" />
          </div>
          <div className="nav-link">
            <h2 className="RPC-title">{name}</h2>
          </div>
          <p className="RPC-description">{description}</p>
        </section>

        <div className="search-button-container">
          <button className="search-button"
            onClick={(event) => { submitNewRestaurant(event) }}
          >Add new restaurant</button>
        </div>

        {message && <p className="restaurant-admin-error-message">{message}</p>}

        <p className="rpc-instructions">Delete a restaurant</p>

        {deleteMessage && deleteMessage}

        {restaurantDeleteCards()}

      </section>


    )
  }

  export default RestaurantAdmin