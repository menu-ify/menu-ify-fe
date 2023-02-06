import React from 'react'
import './NotFound.css'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="nf-title">404</h1>
      <h2 className="nf-instructions">
        Restaurant Not Found
      </h2>
      <NavLink to={`/`} className="container-link">
        <section className="error-card-container">
          <div className="error-image-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Sorry_we_are_closed_sign.jpg/640px-Sorry_we_are_closed_sign.jpg"
              alt="Sorry We Are Closed sign hanging in a restaurant window"
              className="error-image"
            />
          </div>
          <h2 className="NFC-title">Explore more menus</h2>
          <p className="NFC-description">
            Tap or click the link above for other restaurants.
          </p>
        </section>
      </NavLink>
    </div>
  )
}

export default NotFound
