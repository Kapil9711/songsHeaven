"use client";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import SongCard from "@/components/SongCard";
import {
  albubmSearchAction,
  globalSearchAction,
  playlistSearchAction,
  songSearchAction,
} from "@/store/slices/songSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Songs = () => {
  const song = useSelector((state) => state.songs.song);
  const album = useSelector((state) => state.songs.album);
  const playlist = useSelector((state) => state.songs.playlist);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  console.log("song", song);
  console.log("album", album);
  console.log("playlist", playlist);

  useEffect(() => {
    Array.from({ length: 3 }).forEach((item, idx) => {
      if (idx === 0) dispatch(songSearchAction());
      if (idx === 1) dispatch(albubmSearchAction());
      if (idx === 2) dispatch(playlistSearchAction());
    });
  }, []);
  useEffect(() => {
    if (song.length > 0) setLoading(false);
  }, [song]);

  return (
    <div className="pt-5 ">
      <div className="container mx-auto flex justify-center">
        <SearchBar />
      </div>
      {/* SongContent */}
      <div
        style={{ maxHeight: "calc(100vh - 180px)" }}
        className="overflow-y-scroll mt-1"
      >
        <div className="mt-1 px-1 md:px-2  lg:px-5 xl:px-8">
          {/* // songs */}
          <div className=" p-4 ">
            <h2 className="text-2xl font-bold mb-5 pl-5">Songs</h2>

            <div className="overflow-scroll scroll-smooth">
              {loading ? (
                <div className="flex gap-8  min-w-max  ">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : error ? (
                <h1 className="text-center text-muted text-xl py-4  capitalize">
                  Some thing went wrong
                </h1>
              ) : (
                <div className="flex gap-8  min-w-max  ">
                  {song.map(({ image, name, downloadUrl }, idx) => (
                    <SongCard
                      key={name + idx}
                      name={name}
                      image={image}
                      downloadUrl={downloadUrl}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* albums */}
          <div className=" p-4 ">
            <h2 className="text-2xl font-bold mb-5">Album</h2>

            <div className="overflow-scroll scroll-smooth">
              {loading ? (
                <div className="flex gap-8  min-w-max  ">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : error ? (
                <h1 className="text-center text-muted text-xl py-5  capitalize">
                  Some thing went wrong
                </h1>
              ) : (
                <div className="flex gap-8  min-w-max  ">
                  {album.map(({ image, name }, idx) => (
                    <SongCard
                      key={name + idx}
                      name={name}
                      image={image}
                      type="album"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* playlist */}
          <div className=" p-4 ">
            <h2 className="text-2xl font-bold mb-5">Playlist</h2>

            <div className="overflow-scroll scroll-smooth">
              {loading ? (
                <div className="flex gap-8  min-w-max  ">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : error ? (
                <h1 className="text-center text-muted text-xl py-4  capitalize">
                  Some thing went wrong
                </h1>
              ) : (
                <div className="flex gap-8  min-w-max  ">
                  {playlist.map(({ image, name }, idx) => (
                    <SongCard
                      key={name + idx}
                      name={name}
                      image={image}
                      type="playlist"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Songs;
