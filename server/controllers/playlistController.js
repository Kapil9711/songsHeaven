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
  const playlists = await Playlist.find({ userId });
  res.status(200).json({
    message: "Playlist fetched Successfully",
    success: true,
    playlists,
  });
});

// get  playlist By id => /api/v1/playlists/:id (get)
export const getPlaylistById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const playlist = await Playlist.findById(id);
  if (!playlist) return next(new CustomError("Playlist not Found", 404));
  res.status(200).json({
    message: "Playlist fetched Successfully",
    success: true,
    playlist,
  });
});

// delete playlist by id => /api/v1/playlists/:id (delete)
export const deletePlaylistById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const playlist = await Playlist.findByIdAndDelete(id);
  res.status(200).json({
    message: "Playlist deleted Successfully",
    success: true,
  });
});

// update playlist by id => /api/v1/playlists/:id (patch)
export const updatePlaylistById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { playListName, playListType } = req.body;

  if (!playListName && !playListType) {
    return next(new CustomError("Provide the field value to update"));
  }
  let playlist;
  if (playListName && playListType) {
    playlist = await Playlist.findByIdAndUpdate(
      id,
      {
        $set: { playListName, playListType },
      },
      { new: true }
    );
  } else if (playListName) {
    playlist = await Playlist.findByIdAndUpdate(
      id,
      {
        $set: { playListName },
      },
      { new: true }
    );
  } else {
    playlist = await Playlist.findByIdAndUpdate(
      id,
      {
        $set: { playListType },
      },
      { new: true }
    );
  }

  res.status(200).json({
    message: "Playlist updated Successfully",
    success: true,
    playlist,
  });
});

// **************Songs controllers******************

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
  });
});
