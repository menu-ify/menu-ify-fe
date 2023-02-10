import { createSlice, createAction } from "@reduxjs/toolkit"
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
    setInitialMenu: (action) => {
      return action.payload
    }
  }
})

export const deleteMenuItemThunk = (restaurantId, menuId) => async dispatch => {
  await deleteData(`https://menu-ify-be.herokuapp.com/api/v1/restaurants/${restaurantId}/menu_items/${menuId}`)
  // dispatch(menuSlice.actions.deleteMenuItem(id))
  dispatch(menuSlice.reducerdeleteMenuItem(menuId))
}

export const { addMenuItem, setInitialMenu } = menuSlice.actions
export default menuSlice.reducer