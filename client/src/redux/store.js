import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";


const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;

