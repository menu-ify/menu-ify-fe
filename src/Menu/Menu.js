import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import { getData } from "../apiCalls";
import MenuItems from "../MenuItems/MenuItems";
import './Menu.css'

const Menu = () => {
  const [menuItems, setMenuItems] = useState([])
  const { id } = useParams();
  //When we have the actauly server the end point will be 
  //`http://localhost:3001/api/v1/restaurants/${id}/menu_items`
  useEffect(()=> {
    getData("https://a1ecae6b-2320-4cd4-91ed-7da641c93480.mock.pstmn.io/api/v1/restaurants/200/menu_items")
      .then(data=>{
        console.log(data.data)
        setMenuItems(data.data)
      })
  }, [id])

  const filterByCategory = (category) => {
    return menuItems.filter(menuItem => menuItem.attributes.category === category)
  }

  const filteredMenuItems = (category) => filterByCategory(category).map(menuItems => {
    return (
      <MenuItems
        key = {menuItems.id}
        name = {menuItems.attributes.name}
        image = {menuItems.attributes.image}
        price = {menuItems.attributes.price}
        description = {menuItems.attributes.description}
      />

    )
  })
  return (
    <section>
      <h2>Appetizers</h2>
      <section>{filteredMenuItems("appetizer")}</section>
      <h2>Entree</h2>
      <section>{filteredMenuItems("entree")}</section>
      <h2>Draft Beer</h2>
      <section>{filteredMenuItems("draft beer")}</section>
      <h2>Cocktail</h2>
      <section>{filteredMenuItems("cocktail")}</section>
    </section>
  )
  }

export default Menu