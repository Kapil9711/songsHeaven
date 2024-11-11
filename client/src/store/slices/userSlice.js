import { createSlice } from "@reduxjs/toolkit";
import actionFactory from "@/utils/actionFactory.js";
import ENDPOINTS from "@/network/endpoints";
import Cookies from "js-cookie";

const initialState = {
  value: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload.user;
      Cookies.set("user", JSON.stringify(action.payload.user));
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

// create actions

export const SignUpAction = (data, params) => {
  const action = actionFactory();
  action.payload = {
    method: "POST",
    url: ENDPOINTS.SIGNUP,
    data,
    params,
  };
  return action;
};
export const SignInAction = (data, params) => {
  const action = actionFactory();
  action.payload = {
    method: "POST",
    url: ENDPOINTS.SIGNIN,
    data,
    params,
    onSuccess: setUser.type,
  };
  return action;
};
