import { configureStore } from "@reduxjs/toolkit"
// import menuReducer from "./menuSlice"
import menuReducer from "../features/menu/menuSlice"
import thunk from "redux-thunk"

export const store = configureStore({
  reducer: {
    menu: menuReducer
  },
  middleware: [thunk]
})



// export default store
