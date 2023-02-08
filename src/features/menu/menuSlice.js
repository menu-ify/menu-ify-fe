import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: []
  },
  reducers: {
    updateMenu: (state, action) => {
      console.log("action.payload", action.payload)
      return action.payload
    },
  },
});
export const selectMenu = (state) => state.menu
export const { updateMenu } = menuSlice.actions;
export default menuSlice.reducer;