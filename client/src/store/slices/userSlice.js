import { createSlice } from "@reduxjs/toolkit";
import actionFactory from "@/utils/actionFactory.js";
import ENDPOINTS from "@/network/endpoints";

const initialState = {
  value: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
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
  console.log(data);
  const action = actionFactory();
  action.payload = {
    method: "POST",
    url: ENDPOINTS.SIGNIN,
    data,
    params,
  };
  console.log(action);
  return action;
};
