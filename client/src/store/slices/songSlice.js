"use client";
import { createSlice } from "@reduxjs/toolkit";
import ENDPOINTS from "@/network/endpoints";
import actionFactory from "@/utils/actionFactory";

const initialState = {
  song: [],
  album: [],
  playlist: [],
  currentSong: {},
  currentList: {},
  query: "",
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.song = action.payload.data.results || action.payload.data.songs;
      if (window.setLoading) window.setLoading(false);
      if (window.setSearchLoading) window.setSearchLoading(false);
    },
    setAlbum: (state, action) => {
      state.album = action.payload.data.results;
      if (window.setSearchLoading) window.setSearchLoading(false);
      if (window.setLoading) window.setLoading(false);
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload.data.results;
      if (window.setSearchLoading) window.setSearchLoading(false);
      if (window.setLoading) window.setLoading(false);
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setCurrentList: (state, action) => {
      state.currentList.list = action.payload;
      const obj = {};
      action.payload.forEach((item, idx) => {
        if (!obj[item.id]) obj[item.id] = idx;
      });
      state.currentList.idObject = obj;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const {
  setSong,
  setAlbum,
  setPlaylist,
  setCurrentSong,
  setCurrentList,
  setQuery,
} = songSlice.actions;
export default songSlice.reducer;

// create actions

export const globalSearchAction = (data, params) => {
  if (!params) params = { query: "arjit singh", limit: 10, page: 0 };
  const action = actionFactory();
  action.payload = {
    method: "GET",
    url: ENDPOINTS.GLOBALSEARCH,
    data,
    params,
    showToast: false,
  };
  return action;
};
export const songSearchAction = (data, params) => {
  if (!params) params = { query: "arjit singh", limit: 20, page: 0 };
  const action = actionFactory();
  action.payload = {
    method: "GET",
    url: ENDPOINTS.SONGSEARCH,
    data,
    params,
    showToast: false,
    onSuccess: setSong.type,
  };
  return action;
};
export const albubmSearchAction = (data, params) => {
  if (!params) params = { query: "arjit singh", limit: 20, page: 0 };
  const action = actionFactory();
  action.payload = {
    method: "GET",
    url: ENDPOINTS.ALBUMSEARCH,
    data,
    params,
    showToast: false,
    onSuccess: setAlbum.type,
  };
  return action;
};
export const playlistSearchAction = (data, params) => {
  if (!params) params = { query: "arjit singh", limit: 20, page: 0 };
  const action = actionFactory();
  action.payload = {
    method: "GET",
    url: ENDPOINTS.PLAYLISTSEARCH,
    data,
    params,
    showToast: false,
    onSuccess: setPlaylist.type,
  };
  return action;
};

export const playlistByIdAction = (data, params) => {
  const action = actionFactory();
  action.payload = {
    method: "GET",
    url: ENDPOINTS.PLAYLISTBYID,
    data,
    params,
    showToast: false,
    onSuccess: setSong.type,
  };
  return action;
};

export const albumByIdAction = (data, params) => {
  const action = actionFactory();
  action.payload = {
    method: "GET",
    url: ENDPOINTS.ALBUMBYID,
    data,
    params,
    showToast: false,
    onSuccess: setSong.type,
  };
  return action;
};

// export const SignInAction = (data, params) => {
//   const action = actionFactory();
//   action.payload = {
//     method: "POST",
//     url: ENDPOINTS.SIGNIN,
//     data,
//     params,
//     onSuccess: setUser.type,
//   };
//   return action;
// };
