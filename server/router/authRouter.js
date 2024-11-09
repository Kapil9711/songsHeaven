import express from "express";
import { login, register, verify } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get();
router.route("/verify").get(verify);

export default router;
