import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;

