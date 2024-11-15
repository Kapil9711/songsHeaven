"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addFavoriteAction,
  removeFavoriteAction,
} from "@/store/slices/favSlice";
import Cookies from "js-cookie";

const useAddFavorite = () => {
  const favIdObject = useSelector((state) => state.favorite.favIdObject);
  const dispatch = useDispatch();

  const handleFavorite = (songInfo) => {
    let userId = JSON.parse(Cookies.get("user") || "").id || "";
    if (userId) {
      const { id } = songInfo;
      if (favIdObject[id]) dispatch(removeFavoriteAction(null, { songId: id }));
      else dispatch(addFavoriteAction({ songInfo }));
    }
  };
  return handleFavorite;
};

export default useAddFavorite;
