import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import apiMiddleware from "./middlewares/apiMiddleware.js";
import toastMiddleware from "./middlewares/toastMiddleware.js";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiMiddleware,
    toastMiddleware,
  ],
});

export default store;
