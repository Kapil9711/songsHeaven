"use client";
import { setCurrentList, setCurrentSong } from "@/store/slices/songSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import startDownload from "@/utils/startDownload";
import getFormatedTime from "@/utils/getFormatedTime";
import useAddFavorite from "@/cutomHooks/useAddFavorite";

const SongCard = ({ songData, type = "song" }) => {
  const { name, image = [], downloadUrl = [], duration, id } = songData;
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
      <div className="flex justify-between items-center   w-full px-2 py-2 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
        <h2 className="flex flex-col text-xs truncate font-semibold text-gray-800 capitalize dark:text-white">
          {name?.slice(0, 10)}
          {type === "song" && (
            <span className="text-sx text-zinc-600">
              {getFormatedTime(duration)}
            </span>
          )}
        </h2>

        {type === "song" && (
          <div onClick={(e) => e.stopPropagation()} className="flex gap-1">
            <FavButton songData={songData} />
            <button
              onClick={() => startDownload(downloadUrl[4].url, name)}
              className="btn btn-sm "
            >
              <IoMdDownload />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// add to fav
const FavButton = ({ songData }) => {
  const addToFav = useAddFavorite();
  const favIdObject = useSelector((state) => state.favorite.favIdObject);
  return (
    <button
      onClick={() => {
        addToFav(songData);
      }}
      className="btn btn-sm "
    >
      <FaHeart
        style={{ color: favIdObject[songData.id] ? "hsl(335, 79%, 49%)" : "" }}
      />
    </button>
  );
};

export default SongCard;
