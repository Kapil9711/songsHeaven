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
