import React from "react";

const MenuPreviewCard = ({restaurantName, restaurantDescription, restaurantLogo }) => {

  return (
    <section>
      <img src={restaurantLogo} alt={restaurantName}/>
      <h2>{restaurantName}</h2>
      <p>{restaurantDescription}</p>
    </section>
  )
}

export default MenuPreviewCard