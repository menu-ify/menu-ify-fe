//import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  menu: []
}
export const menuSlice = (state = initialState, action) => {
switch (action.type) {
  case "SET_CURRENT_MENU":
    return(action.payload)
  case "DELETE_MENU_ITEM":
    return {

  }
  default: 
  return state
}
}
//+++++++++++++++++
// const initialState = {
//   menuItems: []
// }
// const menuReducer = (state = initialState, action) => {
// switch (action.type) {
//   case "DELETE_MENU_ITEM":
//     return {

//     }
//   default: 
//   return state
// }
// }
//+++++++++++++++++

// export const menuSlice = createSlice({
//   name: "menu",
//   initialState: {
//     menu: []
//   },
//   reducers: {
//     updateMenu: (state, action) => {
//       console.log("action.payload", action.payload)
//       return action.payload
//     },
//   },
// });
export const selectMenu = (state) => state.menu
//export const { updateMenu } = menuSlice.actions;
export default menuSlice.reducer;