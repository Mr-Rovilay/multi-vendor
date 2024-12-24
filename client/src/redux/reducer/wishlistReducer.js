import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: JSON.parse(localStorage.getItem("wishlistItems")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.wishlist.find((item) => item._id === newItem._id);

      if (existingItem) {
        state.wishlist = state.wishlist.map((item) =>
          item._id === existingItem._id ? newItem : item
        );
      } else {
        state.wishlist.push(newItem);
      }

      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;