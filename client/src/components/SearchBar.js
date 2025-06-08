"use client";
import {
  playlistSearchAction,
  setQuery,
  songSearchAction,
} from "@/store/slices/songSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { albubmSearchAction } from "./../store/slices/songSlice";

let id = "";
const debounce = (fn) => {
  return (e) => {
    clearTimeout(id);
    id = setTimeout(() => {
      fn(e);
    }, 500);
  };
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const handleQuery = (query) => {
    dispatch(setQuery(query));
    const params = { query, page: 1, limit: 20 };
    dispatch(songSearchAction(null, params));
    dispatch(albubmSearchAction(null, params));
    dispatch(playlistSearchAction(null, params));
  };

  return (
    <label className="input input-bordered border-2 rounded-full w-60  md:w-96  lg:w-[550px] flex items-center gap-2">
      <input
        onChange={({ target }) => {
          window.setSearchLoading(true);
          const query = target.value;
          debounce(handleQuery)(query || "arjit singh");
        }}
        type="text"
        className="grow"
        placeholder="Search"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

export default SearchBar;
