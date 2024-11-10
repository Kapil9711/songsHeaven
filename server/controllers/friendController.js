import CustomError from "../utils/customError.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

import Friend from "./../models/friends.js";

// follow => /api/v1/friends (post)
export const follow = catchAsyncError(async (req, res, next) => {
  const { followingId } = req.body;
  if (followingId === req.user.id)
    return next(new CustomError("Cannot follow your self", 400));
  const isExist = await Friend.findOne({
    followerId: req.user._id,
    followingId,
  });
  if (isExist) return next(new CustomError("Already Following", 404));
  await Friend.create({ followerId: req.user._id, followingId });
  res.status(201).json({
    message: "Following Successfully",
    success: true,
  });
});

// unFollownew friend => /api/v1/friends (post)
export const unFollow = catchAsyncError(async (req, res, next) => {
  const { followingId } = req.body;
  const friend = await Friend.findOneAndDelete({
    followerId: req.user._id,
    followingId,
  });
  if (!friend) return next(new CustomError("Following not Found", 404));
  res.status(201).json({
    message: "UnFollowed Successfully",
    success: true,
  });
});

// get following => /api/v1/friends/following (get)
export const getFollowing = catchAsyncError(async (req, res, next) => {
  const followerId = req.user._id;
  const friends = await Friend.find({ followerId }, { followingId: 1, _id: 0 })
    .populate("followingId", "name email")
    .lean()
    .exec();
  const followings = friends?.map((item) => item.followingId);
  res.status(201).json({
    message: "Requested Successfully",
    success: true,
    followings,
  });
});

// get follower => /api/v1/friends/follower (get)
export const getFollower = catchAsyncError(async (req, res, next) => {
  const followingId = req.user._id;
  const friends = await Friend.find({ followingId }, { followerId: 1, _id: 0 })
    .populate("followerId", "name email")
    .lean()
    .exec();
  const followers = friends?.map((item) => item.followerId);
  res.status(201).json({
    message: "Requested Successfully",
    success: true,
    followers,
  });
});
