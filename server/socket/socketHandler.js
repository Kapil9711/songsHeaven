import User from "../models/user.js";
import Favorite from "../models/favorites.js";
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("favorite-add", async ({ userId, songData }) => {
      console.log("addding");
      try {
        const { id, name, duration, image, downloadUrl } = songData;
        const isExist = await Favorite.findOne({ userId, id });
        if (!isExist) {
          const favorite = await Favorite.create({
            userId,
            id,
            name,
            image,
            duration,
            downloadUrl,
          });
          const favorites = await Favorite.find({ userId });
          socket.emit("favorite-update", favorites);
        }
      } catch (err) {
        console.error("Error adding to wishlist:", err);
      }
    });
    socket.on("favorite-remove", async ({ userId, songId }) => {
      const isDeleted = await Favorite.findOneAndDelete({
        userId,
        id: songId,
      });
      const favorites = await Favorite.find({ userId });

      if (isDeleted) {
        console.log("removed, sending favorites");
        socket.emit("favorite-update", favorites);
      }
    });

    // socket.on("wishlist-remove", async ({ userId, productId }) => {
    //   try {
    //     const user = await User.findById(userId);
    //     user.wishlist = user.wishlist.filter(
    //       (id) => id.toString() !== productId
    //     );
    //     await user.save();

    //     // Emit updated wishlist to all connected clients
    //     io.emit("wishlist-update", user.wishlist);
    //   } catch (err) {
    //     console.error("Error removing from wishlist:", err);
    //   }
    // });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default socketHandler;
