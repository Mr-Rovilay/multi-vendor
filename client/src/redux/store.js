import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { sellerReducer } from "./reducer/seller";
import { productReducer } from "./reducer/productReducer";
import { eventReducer } from "./reducer/eventReducer";


const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer

  },
});

export default Store;

