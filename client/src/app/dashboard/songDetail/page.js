"use client";
import GoBackButton from "@/components/GoBackButton.js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdDownload } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { setCurrentList, setCurrentSong } from "@/store/slices/songSlice";
import startDownload from "@/utils/startDownload";

const SongDetail = () => {
  const song = useSelector((state) => state.songs.song);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (song.length === 0) setError("Songs Not Found");
    }, 1000);
  }, []);

  return (
    <div className="pt-4 ">
      <div className="px-5 ">
        <GoBackButton />
        <button className="btn  btn-secondary block mx-auto">Songs</button>
      </div>
      {/* songsDetails */}
      <div
        style={{ maxHeight: "calc(100vh - 200px)" }}
        className="xl:px-32  overflow-y-scroll"
      >
        {loading ? (
          <div className="py-8 px-8 flex flex-col gap-5 mt-4">
            <div className="skeleton h-16 w-full rounded-sm"></div>
            <div className="skeleton h-16 w-full rounded-sm"></div>
            <div className="skeleton h-16 w-full rounded-sm"></div>
            <div className="skeleton h-16 w-full rounded-sm"></div>
            <div className="skeleton h-16 w-full rounded-sm"></div>
            <div className="skeleton h-16 w-full rounded-sm"></div>
            <div className="skeleton h-16 w-full rounded-sm"></div>
            <div className="skeleton h-16 w-full rounded-sm"></div>
            <div className="skeleton h-16 w-full rounded-sm"></div>
            <div className="skeleton h-16 w-full rounded-sm"></div>
          </div>
        ) : error ? (
          <NotFoundMessage error={error} />
        ) : (
          <div className="py-8 px-2 md:px-4 lg:px-5 xl:px-8 flex flex-col gap-5 mt-4">
            {song.map(({ name, image, downloadUrl, duration, id }, idx) => (
              <SongDetailCard
                key={id + idx}
                songData={{ name, image, downloadUrl, duration }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SongDetailCard = ({ songData }) => {
  const { name, image = [], downloadUrl = [], duration } = songData;
  const song = useSelector((state) => state.songs.song);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentSong({ name, image, downloadUrl, duration }));
    dispatch(setCurrentList(song));
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center cursor-pointer gap-2 lg:gap-5 md:gap-4 xl:gap-8 shadow-md relative"
    >
      <img
        className="bg-cover h-10 w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16 rounded-sm  "
        src={image[2]?.url}
      />
      <div>
        <p className=" text-sm md:text-md capitalize">{name?.slice(0, 30)}</p>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-2 lg:right-5 xl:right-8 flex items-center gap-2"
      >
        <LikeButton />
        <button
          onClick={() => startDownload(downloadUrl[4].url, name)}
          className="btn"
        >
          <IoMdDownload className=" md:text-md lg:text-lg xl:text-xl" />
        </button>
      </div>
    </div>
  );
};

export const LikeButton = () => {
  return (
    <>
      <button className="btn">
        <FaHeart className="md:text-md lg:text-lg xl:text-xl" />
      </button>
    </>
  );
};

const NotFoundMessage = ({ error }) => {
  const router = useRouter();
  const [counter, setCounter] = useState(3);
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    const notFoundTimeOut = setTimeout(() => {
      router.push("/dashboard/songs");
    }, 3000);
    return () => {
      clearInterval(counterInterval);
      clearTimeout(notFoundTimeOut);
    };
  }, []);

  return (
    <>
      <div role="alert" className="alert alert-error mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
        <div className="flex gap-4 items-center">
          <p>Going Back In </p>
          <span className="countdown font-mono text-6xl">
            <span style={{ "--value": counter }}></span>
          </span>
        </div>
      </div>
    </>
  );
};

export default SongDetail;
