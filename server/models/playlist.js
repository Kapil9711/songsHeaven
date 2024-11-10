import mongoose from "mongoose";

// Playlist Schema Definition
const playlistSchema = new mongoose.Schema({
  // Reference to the user who owns the playlist
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "UserId is required"], // User ID is mandatory
    ref: "User",
  },

  // Name of the playlist
  playListName: {
    type: String,
    required: [true, "Playlist name is required"], // Playlist name is mandatory
    unique: true, // Playlist name should be unique
  },

  // Type of the playlist: can be 'private' or 'public'
  playListType: {
    type: String,
    enum: {
      values: ["private", "public"], // Restrict to 'private' or 'public' only
      message: (value) => `${value} is not a valid playlist type`, // Custom error message
    },
    default: "private", // Default to 'private' if not specified
  },

  // Array of songs in the playlist
  playlistSongs: [
    {
      _id: { type: Boolean, default: false },
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
          _id: { type: Boolean, default: false },
          quality: String, // Quality of the image (e.g., low, high)
          url: String, // URL of the image
        },
      ],

      // Array of download URLs for the song (if available)
      downloadUrl: [
        {
          _id: { type: Boolean, default: false },
          quality: String, // Quality of the download (e.g., high, medium)
          url: String, // URL to download the song
        },
      ],
    },
  ],
});

playlistSchema.index({ userId: 1 });

// Export the Playlist model
const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
