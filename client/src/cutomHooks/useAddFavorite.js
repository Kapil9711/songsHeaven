"use client";

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addFavoriteAction, getFavoriteAction } from "@/store/slices/favSlice";

const useAddFavorite = () => {
  const [songData, setSongData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (songData) {
      dispatch(addFavoriteAction({ songInfo: songData }));
      setTimeout(() => {
        dispatch(getFavoriteAction());
      }, 200);
    }
  }, [songData]);

  return setSongData;
};

export default useAddFavorite;
