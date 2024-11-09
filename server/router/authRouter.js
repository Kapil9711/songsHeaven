import express from "express";
import { register, verify } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post();
router.route("/logout").get();
router.route("/verify").get(verify);

export default router;
