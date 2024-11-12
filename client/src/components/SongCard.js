"use client";
import React from "react";

const SongCard = () => {
  return (
    <div
      className="flex items-end overflow-hidden bg-cover rounded-lg h-40 w-44 shadow-lg"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1621111848501-8d3634f82336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80")',
      }}
    >
      <div className="w-full px-2 py-2 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
        <h2 className="text-sm font-semibold text-gray-800 capitalize dark:text-white">
          Song name
        </h2>
      </div>
    </div>
  );
};

export default SongCard;
