"use client";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import SongCard from "@/components/SongCard";
import { getFavoriteAction } from "@/store/slices/favSlice";
import {
  albubmSearchAction,
  globalSearchAction,
  playlistSearchAction,
  songSearchAction,
} from "@/store/slices/songSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Songs = () => {
  const song = useSelector((state) => state.songs.song);
  const album = useSelector((state) => state.songs.album);
  const playlist = useSelector((state) => state.songs.playlist);
  const query = useSelector((state) => state.songs.query);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const params = { query: query || "arjit singh", limit: 20, page: 1 };
    dispatch(getFavoriteAction());
    dispatch(songSearchAction(null, params));
    dispatch(albubmSearchAction(null, params));
    dispatch(playlistSearchAction(null, params));
  }, []);
  useEffect(() => {
    if (song.length > 0) setLoading(false);
  }, [song]);

  return (
    <div className="pt-5 ">
      <div className="container mx-auto flex justify-center">
        <SearchBar />
      </div>

      <div
        style={{ maxHeight: "calc(100vh - 180px)" }}
        className="overflow-y-scroll mt-1"
      >
        <div className="mt-1 px-1 md:px-2  lg:px-5 xl:px-8">
          <ShowSongs song={song} loading={loading} />

          <ShowAlbum album={album} loading={loading} />

          <ShowPlaylist playlist={playlist} loading={loading} />
        </div>
      </div>
    </div>
  );
};

const ShowSongs = ({ song, loading = "false", error = "" }) => {
  const router = useRouter();
  return (
    <div className="p-4">
      <h2 className="text-2xl relative font-bold mb-5 px-5">
        Songs
        <span
          onClick={() => router.push("/dashboard/songDetail")}
          className="absolute text-sm text-muted top-2 right-10"
        >
          <a className="link link-neutral">see more</a>
        </span>
      </h2>

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
            {song.map(({ image, name, downloadUrl, duration, id }, idx) => (
              <SongCard
                key={name + idx}
                songData={{ name, image, downloadUrl, duration, id }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ShowAlbum = ({ album, loading = "false", error = "" }) => {
  return (
    <div className=" p-4 ">
      <h2 className="text-2xl relative font-bold mb-5 px-5">
        Album
        <span className="absolute text-sm text-muted top-2 right-10">
          <a className="link link-neutral">see more</a>
        </span>
      </h2>

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

const ShowPlaylist = ({ playlist, loading = "false", error = "" }) => {
  return (
    <div className=" p-4 ">
      <h2 className="text-2xl relative font-bold mb-5 px-5">
        Playlist
        <span className="absolute text-sm text-muted top-2 right-10">
          <a className="link link-neutral">see more</a>
        </span>
      </h2>

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
            {playlist.map(({ image, name }, idx) => (
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

export default Songs;
