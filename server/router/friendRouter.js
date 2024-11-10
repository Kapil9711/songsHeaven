import express from "express";
import { Authenticate } from "./../middlewares/authMiddleware.js";
import {
  follow,
  unFollow,
  getFollower,
  getFollowing,
} from "../controllers/friendController.js";

const router = express.Router();

router.route("/follow").post(Authenticate, follow);
router.route("/unFollow").post(Authenticate, unFollow);
router.route("/follower").get(Authenticate, getFollower);
router.route("/following").get(Authenticate, getFollowing);

export default router;
