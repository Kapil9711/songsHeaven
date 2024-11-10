import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "UserId is required"], // User ID is mandatory
    unique: true, // User ID should be unique across playlists
  },

  // Song ID (e.g., unique identifier for the song)
  id: {
    type: String,
    required: [true, "Song ID is required"], // Song ID is mandatory
  },

  // Name of the song
  name: {
    type: String,
    required: [true, "Song name is required"], // Song name is mandatory
  },

  // Duration of the song in seconds
  duration: {
    type: Number,
    required: [true, "Song duration is required"], // Duration is mandatory
  },

  // Array of images for the song (e.g., album art)
  image: [
    {
      quality: String, // Quality of the image (e.g., low, high)
      url: String, // URL of the image
    },
  ],

  // Array of download URLs for the song (if available)
  downloadUrl: [
    {
      quality: String, // Quality of the download (e.g., high, medium)
      url: String, // URL to download the song
    },
  ],
});

favoritesSchema.index({ userId: 1 });

const Favorite = mongoose.model("Favorite", favoritesSchema);

export default Favorite;
