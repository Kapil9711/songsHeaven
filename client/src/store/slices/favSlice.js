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

// create actions

export const addFavoriteAction = (data, params) => {
  const action = actionFactory();
  action.payload = {
    method: "POST",
    url: ENDPOINTS.ADDTOFAV,
    data,
    onSuccess: setFavorite.type,
    showToast: false,
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

export const removeFavoriteAction = (data, params) => {
  const action = actionFactory();
  action.payload = {
    method: "DELETE",
    url: `${ENDPOINTS.REMOVEFAV}/${params.songId}`,
    data,
    onSuccess: setFavorite.type,
    showToast: false,
  };
  return action;
};
