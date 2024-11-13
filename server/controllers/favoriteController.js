import CustomError from "../utils/customError.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import Favorite from "./../models/favorites.js";
import User from "../models/user.js";

// create new playlist => /api/v1/playlists (post)
export const createFavorites = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { songInfo } = req.body;
  const { id, name, duration, image, downloadUrl } = songInfo;
  const isExist = await Favorite.findOne({ userId, id });
  if (isExist) return next(new CustomError("Already in favorites", 400));
  const favorite = await Favorite.create({
    userId,
    id,
    name,
    image,
    duration,
    downloadUrl,
  });
  if (!favorite) return next(new CustomError("Internal server Error", 500));
  res.status(201).json({
    message: "Favorite Added Successfully",
    success: true,
    favorite,
  });
});

// get all favs => /api/v1/favorite (get)
export const getAllFavorites = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const favorites = await Favorite.find({ userId });
  res.status(200).json({
    message: "Favorites fetched Successfully",
    success: true,
    favorites,
  });
});

// get  favorite By userId => /api/v1/favorite/:id (get)
export const getFavoritesByUserid = catchAsyncError(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) return next(new CustomError("No User Found", 404));

  if (userId !== req.user.id && user.favType !== "public") {
    return next(new CustomError("Not Allowed to get fav songs", 400));
  }
  const favorites = await Favorite.find({ userId });
  res.status(200).json({
    message: "Favorites fetched Successfully",
    success: true,
    favorites,
  });
});

// delete Favorite by songId => /api/v1/favorites/:songId (delete)
export const deleteFavortieBySongId = catchAsyncError(
  async (req, res, next) => {
    const { songId } = req.params;
    const isDeleted = await Favorite.findOneAndDelete({
      userId: req.user._id,
      id: songId,
    });
    if (!isDeleted)
      return next(new CustomError("No song Found to delete", 404));
    res.status(200).json({
      message: "Song removed from Favorites Successfully",
      success: true,
    });
  }
);
