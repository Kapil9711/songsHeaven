"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongCard from "@/components/SongCard";
import Skeleton from "@/components/Skeleton";
import GoBackButton from "@/components/GoBackButton";
import { ShowSkeleton } from "../albumDetail/page";

const AlbumDetail = ({}) => {
  const playlist = useSelector((state) => state.songs.playlist);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (playlist.length === 0) setError("Songs Not found");
    }, 600);
  }, []);

  return (
    <div className="pt-4">
      <div className=" px-4 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        <div className="flex justify-between">
          <GoBackButton />
        </div>
        <button className="btn btn-secondary mt-3 md:mt-0 block mx-auto">
          Playlist
        </button>
      </div>
      {/* album details  */}
      <div
        style={{ height: "calc(100vh - 108px)" }}
        className="mt-4 md:pb-28 pb-[250px] px-2 md:px-4 lg:px-5 xl:px-10 overflow-scroll"
      >
        {loading ? (
          <ShowSkeleton />
        ) : error ? (
          <NotFoundMessage error={error} />
        ) : (
          <div className="flex  flex-wrap gap-8 justify-center ">
            {playlist.map(({ image, name, id }, idx) => (
              <SongCard
                key={name + idx}
                songData={{ name, image, id }}
                type="playlist"
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
