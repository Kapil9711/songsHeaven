import express from "express";
import { Authenticate } from "./../middlewares/authMiddleware.js";
import {
  addSong,
  createPlaylist,
  getAllPlaylist,
  deleteSong,
  getPlaylistById,
  deletePlaylistById,
  updatePlaylistById,
} from "../controllers/playlistController.js";
const router = express.Router();

router.route("/").post(Authenticate, createPlaylist);
router.route("/").get(Authenticate, getAllPlaylist);
router.route("/:id").get(Authenticate, getPlaylistById);
router.route("/:id").delete(Authenticate, deletePlaylistById);
router.route("/:id").patch(Authenticate, updatePlaylistById);

// songs url
router.route("/:id/songs").post(Authenticate, addSong);
router.route("/:id/songs/:songId").delete(Authenticate, deleteSong);

export default router;
