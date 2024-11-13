"use client";
import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
const qualityObj = { HD: 4, High: 3, Medium: 2, Low: 1, "Very Low": 0 };
const qualityArr = [
  { name: "HD", quality: "320kbps" },
  { name: "High", quality: "160kbps" },
  { name: "Medium", quality: "96kbps" },
  { name: "Low", quality: "48kbps" },
  { name: "Very Low", quality: "12kbps" },
];
const Player = () => {
  const [quality, setQuality] = useState("HD");
  const currentSong = useSelector((state) => state.songs.currentSong);
  const { downloadUrl = [], image = [] } = currentSong;

  return (
    <>
      {Object.keys(currentSong).length === 0 ? (
        <h1></h1>
      ) : (
        <div className="flex">
          <img
            className="bg-cover rouned-sm w-20 h-20 block"
            src={image[2]?.url}
          />
          <MemoizedMusicPlayer downloadUrl={downloadUrl} quality={quality} />
          <div className="w-48 h-20 flex justify-center items-center bg-white">
            <MemoizedDropDown
              setQuality={setQuality}
              quality={quality}
              downloadUrl={downloadUrl}
            />
          </div>
        </div>
      )}
    </>
  );
};

const QualityDropDown = ({ setQuality, quality, downloadUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  let len = downloadUrl.length > 0 ? downloadUrl.length - 1 : 0;
  if (len === 4) len = 0;
  return (
    <div className="dropdown dropdown-top dropdown-end">
      <div
        tabIndex={0}
        role="button"
        onClick={() => setIsOpen(true)}
        className="btn w-[90px] px-0 text-xs h-4  py-1 rounded-md m-1"
      >
        {quality}
      </div>
      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          {qualityArr.slice(len).map((item) => {
            return (
              <li
                key={item.name}
                onClick={() => {
                  setQuality(item.name);
                  setIsOpen(false);
                }}
              >
                <a>
                  {item.name} <span className="ml-1">( {item.quality})</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const MusicPlayer = ({ downloadUrl, quality }) => {
  return (
    <AudioPlayer
      autoPlay
      src={downloadUrl[qualityObj[quality]]?.url}
      onPlay={(e) => console.log("onPlay")}
      // other props here
    />
  );
};

const MemoizedDropDown = React.memo(QualityDropDown);
const MemoizedMusicPlayer = React.memo(MusicPlayer);

export default Player;
