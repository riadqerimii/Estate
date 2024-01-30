import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSLice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // sign-in
    singInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    singInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // update
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // delete
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // sing out
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  // sign in
  signInSuccess,
  singInFailure,
  singInStart,
  // update
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  // de;ete
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  // sign out
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} = userSLice.actions;

export default userSLice.reducer;
