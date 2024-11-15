import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  followerId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Follower id is required"],
    ref: "User",
  },
  followingId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Following id is required"],
    ref: "User",
  },
});

friendSchema.index({ followerId: 1 });
friendSchema.index({ followingId: 1 });

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;
