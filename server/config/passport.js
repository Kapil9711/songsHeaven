import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./envConfig.js";
import User from "../models/user.js";

// configObj for auth
const configObj = {
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_PASSWORD,
  callbackURL: `${config.CALL_BACK_URL}/api/v1/auth/google/callback`,
};

// callback it run when the authentication successfull
const callBackFn = async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ email: profile.emails[0].value }).select(
    "-password -authMethod -isVerified -__v"
  );
  try {
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        profilePic: profile.photos ? profile.photos[0].value : null,
        authMethod: "google",
        isVerified: true,
      });
    } else {
      user.profilePic = profile.photos ? profile.photos[0].value : null;
      user.isVerified = true;
      user.googleId = profile.id;
      user.authMethod = "google";
      await user.save();
    }

    done(null, user);
  } catch (error) {
    done(null, user);
  }
};
// main middleware
passport.use(new GoogleStrategy(configObj, callBackFn));

// serialize userData before saving it to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserialize userData to authenticate the user
passport.deserializeUser((user, done) => {
  done(null, user);
});
