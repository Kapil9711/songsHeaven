import express from "express";
import { register } from "../controllers/authController.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post();
router.route("/logout").get();

export default router;
