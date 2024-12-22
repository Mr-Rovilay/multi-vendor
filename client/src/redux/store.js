import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { sellerReducer } from "./reducer/seller";
import { productReducer } from "./reducer/productReducer";


const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
  },
});

export default Store;

