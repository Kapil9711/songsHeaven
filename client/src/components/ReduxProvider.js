"use client";
import { socketUrl } from "@/network/endpoints";
import store from "@/store/configureStore.js";
import { useEffect } from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
