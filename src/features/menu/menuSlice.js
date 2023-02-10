import { createSlice } from "@reduxjs/toolkit"
//import { createSlice, createAction } from "@reduxjs/toolkit"
import { deleteData } from "../../apiCalls"

const initialState = []

const menuSlice = createSlice({
  name: "menu",
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
      console.log("DATADELETE", data)
      dispatch(deleteMenuItem(menuId))
    })
  // dispatch(menuSlice.actions.deleteMenuItem(id))
}

export const { addMenuItem, setInitialMenu, deleteMenuItem } = menuSlice.actions
export default menuSlice.reducer