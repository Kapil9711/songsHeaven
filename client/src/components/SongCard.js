"use client";
import { setCurrentList, setCurrentSong } from "@/store/slices/songSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SongCard = ({ songData, type = "song" }) => {
  const { name, image = [], downloadUrl, duration } = songData;
  const song = useSelector((state) => state.songs.song);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (type === "song") {
      dispatch(setCurrentSong({ name, image, downloadUrl, duration }));
      dispatch(setCurrentList(song));
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-end overflow-hidden bg-cover rounded-lg md:h-28 md:w-32 lg:h-32 lg:w-36 xl:h-40 xl:w-44 shadow-lg cursor-pointer"
      style={{
        backgroundImage: `url(${image[2]?.url})`,
      }}
    >
      <div className="w-full px-2 py-2 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
        <h2 className="text-xs  text-ellipsis font-semibold text-gray-800 capitalize dark:text-white">
          {name?.slice(0, 10)}
        </h2>
      </div>
    </div>
  );
};

export default SongCard;
