import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { sellerReducer } from "./reducer/seller";


const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer
  },
});

export default Store;

