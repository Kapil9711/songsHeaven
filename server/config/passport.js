import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./envConfig.js";

const configObj = {
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_PASSWORD,
  callbackURL: config.CALL_BACK_URL,
};

const callBackFn = (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  done(null, profile);
};

passport.use(new GoogleStrategy(configObj, callBackFn));

// serialize userData before saving it to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserialize userData to authenticate the user
passport.deserializeUser((user, done) => {
  done(null, user);
});
