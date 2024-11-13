import { createSlice } from "@reduxjs/toolkit";
import ENDPOINTS from "@/network/endpoints";
import actionFactory from "@/utils/actionFactory";
import Cookies from "js-cookie";

const initialState = {
  song: [],
  album: [],
  playlist: [],
  currentSong: {},
  currentList: [],
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.song = action.payload.data.results;
    },
    setAlbum: (state, action) => {
      state.album = action.payload.data.results;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload.data.results;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setCurrentList: (state, action) => {
      state.currentList = action.payload;
    },
  },
});

export const {
  setSong,
  setAlbum,
  setPlaylist,
  setCurrentSong,
  setCurrentList,
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
  if (!params) params = { query: "arjit singh", limit: 10, page: 0 };
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
  if (!params) params = { query: "arjit singh", limit: 10, page: 0 };
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
  if (!params) params = { query: "arjit singh", limit: 10, page: 0 };
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
