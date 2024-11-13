"use client";
import { createSlice } from "@reduxjs/toolkit";
import ENDPOINTS from "@/network/endpoints";
import actionFactory from "@/utils/actionFactory";

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
      action.payload.favorites.forEach((item) => {
        if (!state.favIdObject[item.id]) state.favIdObject[item.id] = true;
      });
    },
  },
});

export const { setFavorite } = favSlice.actions;
export default favSlice.reducer;

// create actions

export const addFavoriteAction = (data, params) => {
  const action = actionFactory();
  action.payload = {
    method: "POST",
    url: ENDPOINTS.ADDTOFAV,
    data,
  };
  return action;
};

export const getFavoriteAction = (data, params) => {
  const action = actionFactory();
  action.payload = {
    method: "GET",
    url: ENDPOINTS.GETFAV,
    data,
    onSuccess: setFavorite.type,
    showToast: false,
  };
  return action;
};
