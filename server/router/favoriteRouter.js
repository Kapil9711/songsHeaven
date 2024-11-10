import express from "express";
import { Authenticate } from "./../middlewares/authMiddleware.js";
import {
  createFavorites,
  deleteFavortieBySongId,
  getAllFavorites,
  getFavoritesByUserid,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.route("/").post(Authenticate, createFavorites);
router.route("/").get(Authenticate, getAllFavorites);

router.route("/:userId").get(Authenticate, getFavoritesByUserid);
router.route("/:songId").delete(Authenticate, deleteFavortieBySongId);

export default router;
