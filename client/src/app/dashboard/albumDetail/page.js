"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongCard from "@/components/SongCard";
import Skeleton from "@/components/Skeleton";
import GoBackButton from "@/components/GoBackButton";

const AlbumDetail = ({}) => {
  const album = useSelector((state) => state.songs.album);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (album.length === 0) setError("Songs Not found");
    }, 1000);
  }, []);

  return (
    <div className="pt-4">
      <div className=" px-4 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        <div className="flex justify-between">
          <GoBackButton />
        </div>
        <button className="btn btn-secondary block mx-auto">Album</button>
      </div>
      {/* album details  */}
      <div>
        {loading ? (
          <div className="album-container">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : error ? (
          <NotFoundMessage error={error} />
        ) : (
          <div className="album-container">
            {album.map(({ image, name }, idx) => (
              <SongCard
                key={name + idx}
                songData={{ name, image }}
                type="album"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const NotFoundMessage = ({ error }) => {
  return <div>{error}</div>;
};

export default AlbumDetail;
