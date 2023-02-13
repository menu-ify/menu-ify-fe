import { createSlice } from "@reduxjs/toolkit"
import { deleteData, postData } from "../../apiCalls"

const initialState = []

const menuSlice = createSlice({
  name: "menuItems",
  initialState,
  reducers: {
    addMenuItem: (state, action) => {
      return [...state, action.payload]
    },
    deleteMenuItem: (state, action) => {
      return state.filter(menuItem => menuItem.id !== action.payload)
    },
    setInitialMenu: (state, action) => {
      return action.payload
    },
  }
})

// export const deleteMenuItemThunk = (restaurantid, menuId) => async dispatch => {
//   await deleteData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${restaurantid}/menu_items/${menuId}`)
//   // dispatch(menuSlice.actions.deleteMenuItem(id))
//   dispatch(menuSlice.reducers.deleteMenuItem(menuId))
// }

export const deleteMenuItemAsync = (restaurantid, menuId) => dispatch => {
  deleteData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${restaurantid}/menu_items/${menuId}`)
    .then(data=> {
      if (data.message === 'Menu item has successfully been deleted at this restaurant') {
        console.log("DATADELETE", data)
        dispatch(deleteMenuItem(menuId))
      }
    })
}

export const addMenuItemAsync = (newMenuItem, restaurantId) => dispatch => {
  postData(newMenuItem, `https://menu-ify-be.herokuapp.com/api/v1/restaurants/${restaurantId}/menu_items`)
    .then(response => {
      dispatch(addMenuItem(response))
    })
}

export const { addMenuItem, setInitialMenu, deleteMenuItem } = menuSlice.actions
export default menuSlice.reducer