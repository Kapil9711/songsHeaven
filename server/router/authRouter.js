import express from "express";
import {
  googleLogin,
  login,
  register,
  verify,
} from "../controllers/authController.js";
import passport from "passport";
import config from "../config/envConfig.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get();
router.route("/verify").get(verify);

// google auth
router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

// google callback
router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: `${config.CALL_BACK_URL}`,
  }),
  googleLogin
);

export default router;
