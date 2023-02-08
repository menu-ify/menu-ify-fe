import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: ["test", "test"]
  },
  reducers: {
    updateMenu: (state, action) => {
      console.log("ACTION", action)
      state.menu = action.payload
    },
  },
});
export const selectMenu = (state) => state.menu.value
export const { updateMenu } = menuSlice.actions;
export default menuSlice.reducer;