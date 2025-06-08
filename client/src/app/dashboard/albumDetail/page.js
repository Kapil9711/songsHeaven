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
    const id = setTimeout(() => {
      setLoading(false);
      if (album.length === 0) setError("Songs Not found");
    }, 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="pt-4">
      <div className="  px-4 sm:px-10 md:px-16 lg:px-20 xl:px-24 ">
        <div className="flex justify-between">
          <GoBackButton />
        </div>
        <button className="btn btn-secondary mt-2 md:mt-0 block mx-auto">
          Album
        </button>
      </div>
      {/* album details  */}
      <div
        style={{ height: "calc(100vh - 120px)" }}
        className="mt-4 pb-28 px-2 md:px-4 lg:px-5 xl:px-10 overflow-scroll "
      >
        {loading ? (
          <ShowSkeleton />
        ) : error ? (
          <NotFoundMessage error={error} />
        ) : (
          <div className=" flex  flex-wrap gap-5  md:gap-8 justify-center  ">
            {album.map(({ image, name, id }, idx) => (
              <SongCard
                key={name + idx}
                songData={{ name, image, id }}
                type="album"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const ShowSkeleton = () => {
  return (
    <div className=" flex flex-wrap justify-center gap-8 ">
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
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

const NotFoundMessage = ({ error }) => {
  return <div>{error}</div>;
};

export default AlbumDetail;
