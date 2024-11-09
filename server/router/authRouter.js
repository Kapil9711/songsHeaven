import express from "express";
const router = express.Router();

router.route("/login").post();
router.route("/register").post();
router.route("/logout").get();

export default router;
