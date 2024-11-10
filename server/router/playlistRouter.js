import express from "express";
import { Authenticate } from "./../middlewares/authMiddleware.js";
import {
  createPlaylist,
  getAllPlaylist,
} from "../controllers/playlistController.js";
const router = express.Router();

router.route("/").post(Authenticate, createPlaylist);
router.route("/").get(Authenticate, getAllPlaylist);
router.route("/").delete();
router.route("/").put().patch();

export default router;
