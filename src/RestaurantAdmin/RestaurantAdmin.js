import React, { useState } from "react"
import "../RestaurantAdmin/RestaurantAdmin.css"
import { postData, deleteData, getData } from "../apiCalls"

const RestaurantAdmin = ({ restaurants, setRestaurants, URLRestaurants }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [message, setMessage] = useState("")
  let restaurantID

  const restaurantDeleteCards = () => {
    return restaurants.map((restaurant) => {
      return (
        <div key={restaurant.id} className="delete-restaurant-card">
          <h3 className="delete-header">{restaurant.attributes.name}</h3>
          <button
            id={restaurant.id}
            className="delete-button"
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
    restaurantID = Number(event.target.id)
    deleteData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${restaurantID}`)
      .then((response) => {
        if (!response) {
          setMessage
            ("Error: First, delete all menu items for this restaurant in the Admin screen and try again.")
          window.scrollTo(0, 0)
          setTimeout(() => {
            // clearInputs()
          }, 4000)
        } else {
          setMessage("Restaurant deleted! 🎉")
          window.scrollTo(0, 0)
          getData(URLRestaurants).then(updatedRestaurants => {
            setRestaurants([...updatedRestaurants.data])
          })
          setTimeout(() => {
            clearInputs()
          }, 4000)
        }
      })
  }

  const handleAdd = (event) => {
    event.preventDefault()
    if (name && description && link) {
      const newRestaurant = {
        name: name,
        description: description,
        logo: link,
      }
      window.scrollTo(0, 0)
      postData(newRestaurant, `https://menu-ify-be.herokuapp.com/api/v1/restaurants/`)
      .then((response) => {
        console.log("ID", response.data.id)
        setRestaurants([...restaurants, response.data])
        setMessage(`Congrats! 🎉 Here is the link to your new restaurant menu: https://menu-ify.vercel.app/restaurant/${response.data.id}`)
      }).then(()=> {
      })
      // setTimeout(() => {
      //   clearInputs()
      // }, 4000)

    } else {
      setMessage("Error: Please ensure all fields are completed and/or refresh.")
      window.scrollTo(0, 0)
      setTimeout(() => {
        setMessage("")
      }, 4000)
    }
  }

  const clearInputs = () => {
    setName("")
    setDescription("")
    setLink("")
    setMessage("")
  }

  return (
    <>
      <section className="restaurantMenuContainer">
        <h2 className="rpc-title">Admin View</h2>
        <p className="rpc-instructions">Add a restaurant</p>

        {message &&
          <div
            className="restaurant-admin-error-message text-container"
            onClick={() => setMessage("")}>
            <div
              className="text-container"
            >
              {message}
            </div >
            (Click to close)
          </div>}

        <input
          value={name}
          onChange={(e) => { setName(e.target.value) }}
          placeholder="Enter name..."
          className="form__input"
        >
        </input>

        <input
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
          placeholder="Enter description..."
          className="form__input"
        >
        </input>

        <input
          value={link}
          onChange={(e) => { setLink(e.target.value) }}
          placeholder="Enter URL to image..."
          className="form__input"
        >
        </input>

        <h3>Preview</h3>

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
            onClick={(event) => { handleAdd(event) }}
          >Add new restaurant
          </button>
        </div>
      </section>

      <section className="restaurantMenuContainer delete-margin">
        <h2 className="rpc-title">Admin View</h2>
        <p className="rpc-instructions">Delete a restaurant</p>

        {restaurantDeleteCards()}

      </section>
    </>
  )
}

export default RestaurantAdmin