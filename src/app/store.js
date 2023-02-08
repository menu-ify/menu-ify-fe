import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});


