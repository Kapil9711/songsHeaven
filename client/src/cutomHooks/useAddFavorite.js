"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { setFavorite } from "@/store/slices/favSlice";
import Cookies from "js-cookie";

const useAddFavorite = () => {
  const favIdObject = useSelector((state) => state.favorite.favIdObject);
  const [songData, setSongData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    window.socket.on("favorite-update", (favorites) => {
      dispatch(setFavorite({ favorites }));
    });
  }, []);

  const handleFavorite = (songData) => {
    if (songData && window.socket) {
      let userId = JSON.parse(Cookies.get("user") || "").id || "";
      if (userId) {
        const { id } = songData;
        if (favIdObject[id]) {
          window.socket.emit("favorite-remove", { userId, songId: id });
        } else window.socket.emit("favorite-add", { userId, songData });
      }
    }
  };
  return handleFavorite;
};

export default useAddFavorite;
