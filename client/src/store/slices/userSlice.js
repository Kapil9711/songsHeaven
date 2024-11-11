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

export const googleSignUpAction = ({ data }) => {
  const action = actionFactory;
  action.payload = {
    method: "GET",
    url: ENDPOINTS.GOOGLESINGIN,
    data,
  };
  return action;
};
