"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  favIdObject: {},
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.value = action.payload.favorites;
      const obj = {};
      action.payload.favorites.forEach((item) => {
        if (!obj[item.id]) obj[item.id] = true;
      });
      state.favIdObject = obj;
    },
  },
});

export const { setFavorite } = favSlice.actions;
export default favSlice.reducer;
