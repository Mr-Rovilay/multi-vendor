import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  successMessage: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoadUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoadUserSuccess', (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase('LoadUserFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('SignupRequest', (state) => {
      state.loading = true;
    })
    .addCase('SignupSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase('SignupFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('SetSuccessMessage', (state, action) => {
      state.successMessage = action.payload;
    })
    .addCase('SetErrorMessage', (state, action) => {
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    })
    .addCase('clearMessages', (state) => {
      state.successMessage = null;
    });
});
