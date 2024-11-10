import express from "express";
import { Authenticate } from "./../middlewares/authMiddleware.js";
import {
  addSong,
  createPlaylist,
  getAllPlaylist,
  deleteSong,
} from "../controllers/playlistController.js";
const router = express.Router();

router.route("/").post(Authenticate, createPlaylist);
router.route("/").get(Authenticate, getAllPlaylist);
router.route("/:id").get(Authenticate);
router.route("/:id").delete(Authenticate);

// songs url
router.route("/:id/songs").post(Authenticate, addSong);
router.route("/:id/songs/:songId").delete(Authenticate, deleteSong);

export default router;
