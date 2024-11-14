import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import apiMiddleware from "./middlewares/apiMiddleware.js";
import toastMiddleware from "./middlewares/toastMiddleware.js";
import songReducer from "./slices/songSlice.js";
import favReducer from "./slices/favSlice.js";
import socketIoClient from "socket.io-client";

const store = configureStore({
  reducer: {
    user: userReducer,
    songs: songReducer,
    favorite: favReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiMiddleware,
    toastMiddleware,
  ],
});

export default store;
