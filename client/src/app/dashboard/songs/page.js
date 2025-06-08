"use client";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import SongCard from "@/components/SongCard";
import { getFavoriteAction } from "@/store/slices/favSlice";
import {
  albubmSearchAction,
  globalSearchAction,
  playlistSearchAction,
  setSong,
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
    window.setSearchLoading = setLoading;
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
      <div className="container mx-auto flex pl-3 ms:pl-0  ms:justify-center relative">
        <SearchBar />
        <FavoriteBtn />
      </div>

      <div
        style={{ maxHeight: "calc(100vh - 80px)" }}
        className="overflow-y-scroll mt-1"
      >
        <div className="mt-1 pb-24 px-1 md:px-2  lg:px-5 xl:px-8">
          <ShowSongs song={song} loading={loading} />
          <ShowAlbum album={album} loading={loading} />
          <ShowPlaylist playlist={playlist} loading={loading} />
        </div>
      </div>
    </div>
  );
};

const FavoriteBtn = () => {
  const favorite = useSelector((state) => state.favorite.value);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = () => {
    setTimeout(() => dispatch(setSong({ data: { results: favorite } })), 600);
    router.push("/dashboard/songDetail?type=favorite");
  };
  return (
    <button
      onClick={handleClick}
      className="btn absolute right-4 btn-secondary xl:right-10"
    >
      <span className=" xl:inline-block hidden"> Favorites</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
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
        ) : song.length === 0 ? (
          <h1 className="text-center text-muted text-xl py-4  capitalize">
            Song Not Found
          </h1>
        ) : (
          <div className="flex gap-4 md:gap-8  min-w-max  ">
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
  const router = useRouter();
  return (
    <div className=" p-4 ">
      <h2 className="text-2xl relative font-bold mb-5 px-5">
        Album
        <span
          onClick={() => router.push("/dashboard/albumDetail")}
          className="absolute text-sm text-muted top-2 right-10"
        >
          <a className="link link-neutral">see more</a>
        </span>
      </h2>

      <div className="overflow-scroll scroll-smooth">
        {loading ? (
          <div className="flex gap-4 md:gap-8  min-w-max  ">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : album.length === 0 ? (
          <h1 className="text-center text-muted text-xl py-5  capitalize">
            Album Not Found
          </h1>
        ) : (
          <div className="flex gap-4 md:gap-8 min-w-max  ">
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

const ShowPlaylist = ({ playlist, loading = "false", error = "" }) => {
  const router = useRouter();
  return (
    <div className=" p-4 ">
      <h2 className="text-2xl relative font-bold mb-5 px-5">
        Playlist
        <span
          onClick={() => router.push("/dashboard/playlistDetail")}
          className="absolute text-sm text-muted top-2 right-10"
        >
          <a className="link link-neutral">see more</a>
        </span>
      </h2>

      <div className="overflow-scroll scroll-smooth">
        {loading ? (
          <div className="flex gap-4 md:gap-8  min-w-max  ">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : playlist.length === 0 ? (
          <h1 className="text-center text-muted text-xl py-5  capitalize">
            Playlist Not Found
          </h1>
        ) : (
          <div className="flex gap-4 md:gap-8  min-w-max  ">
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

export default Songs;
