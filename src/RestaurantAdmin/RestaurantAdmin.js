import React, { useState } from "react"
import "../RestaurantAdmin/RestaurantAdmin.css"
import { postData, deleteData } from "../apiCalls"

const object = {
  "name": "Pho Kyah",
  "description": "Experimental Asian fusion gastropub",
  "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ph%E1%BB%9F_v%E1%BB%8Bt_quay.jpg/640px-Ph%E1%BB%9F_v%E1%BB%8Bt_quay.jpg"
}

const RestaurantAdmin = ({ restaurants }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [message, setMessage] = useState("")

  // const restaurantDeleteCards = () => {
  //   return restaurants.map((restaurant) => {
  //     return (
  //       <div key={restaurant.id} className="delete-restaurant-card">
  //         <h3>{restaurant.attributes.name}</h3>
  //         <button
  //           id={restaurant.id}
  //           className="search-button">
  //           onClick={(event) => handleDelete(event)}
  //           >
  //           Delete
  //         </button>
  //       </div>
  //     )
  //   })
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
    // how do we handle any menuItems associated with the restaurant? Do they get deleted? If yes, there should be a modal warning the user. Otherwise, we can route them to the admin screen to manually delete all the menu items first. 
    // deleteData(`insertUrl${event.target.id}`)
    // setMessage with confirmation of delete etc. 
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
      // postData(newRestaurant, url)
      setTimeout(() => {
        clearInputs()
      }, 3000)
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

      {restaurantDeleteCards()}

    </section>


  )
}

export default RestaurantAdmin