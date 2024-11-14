"use client";
import { socketUrl } from "@/network/endpoints";
import store from "@/store/configureStore.js";
import { useEffect } from "react";
import { Provider } from "react-redux";
import socketIoClient from "socket.io-client";

const ReduxProvider = ({ children }) => {
  useEffect(() => {
    const socket = socketIoClient(socketUrl);
    if (socket) window.socket = socket;
  }, []);
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
