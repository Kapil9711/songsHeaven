import CustomError from "../utils/customError.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import Playlist from "../models/playlist.js";

// create new playlist => /api/v1/playlists (post)
export const createPlaylist = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { playListName } = req.body;
  const playlist = await Playlist.create({ userId, playListName });
  if (!playlist) return next(new CustomError("Internal server Error", 500));
  res.status(200).json({
    message: "Playlist created Successfully",
    success: true,
    playlist,
  });
});

// get all playlist => /api/v1/playlists (get)
export const getAllPlaylist = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const playlist = await Playlist.find({ userId });
  res.status(200).json({
    message: "Playlist fetched Successfully",
    success: true,
    playlist,
  });
});

// add song to playlist => /api/v1/playlists/:id/songs (post)
export const addSong = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { songInfo } = req.body;
  const playlist = await Playlist.findByIdAndUpdate(
    id,
    {
      $push: { playlistSongs: songInfo },
    },
    { new: true }
  );
  res.status(200).json({
    message: `Song add to  ${playlist.playListName} Successfully`,
    success: true,
    playlist,
  });
});

// delete song from playlist => /api/v1/playlists/:id/songs/:songId (delete)
export const deleteSong = catchAsyncError(async (req, res, next) => {
  const { id, songId } = req.params;
  const playlist = await Playlist.updateOne(
    { _id: id },
    { $pull: { playlistSongs: { id: songId } } }
  );
  res.status(200).json({
    message: `Song deleted Successfully`,
    success: true,
    playlist,
  });
});
