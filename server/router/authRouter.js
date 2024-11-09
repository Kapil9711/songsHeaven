import express from "express";
import {
  googleLogin,
  login,
  logout,
  register,
  verify,
} from "../controllers/authController.js";
import passport from "passport";
import config from "../config/envConfig.js";

const router = express.Router();

// local auth
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/verify").get(verify);

// google auth
router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: `${config.CALL_BACK_URL}`,
  }),
  googleLogin
);

export default router;
