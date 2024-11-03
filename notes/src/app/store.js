import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../component/feature/slice";
import authReducer  from './slices/authSlice'


export const store = configureStore({
  reducer: {
    noteReducer,
    authSlice: authReducer
  },
});
