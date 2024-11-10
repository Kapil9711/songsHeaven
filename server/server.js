import express from "express";
import http from "http";
import connectDB from "./config/db.js";
import config from "./config/envConfig.js";
import colors from "colors/safe.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import authRouter from "./router/authRouter.js";
import playlistRouter from "./router/playlistRouter.js";
import favoriteRouter from "./router/favoriteRouter.js";
import friendRouter from "./router/friendRouter.js";

// express setup
const app = express();
const server = http.createServer(app);

//session setup for google auth
app.use(
  session({
    secret: config.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/favorites", favoriteRouter);
app.use("/api/v1/friends", friendRouter);

// handles global error
app.use(globalErrorHandler);

// spinning server
const PORT = config.PORT || 8000;
const MODE = config.NODE_ENV || "production";

const start = async () => {
  try {
    await connectDB(config.MONGO_URI);
    server.listen(PORT, () => {
      console.log(colors.bgGreen(`Listening on port ${PORT} in ${MODE} mode.`));
    });
  } catch (error) {
    console.log(colors.bgRed("Error connecting to DB, server Aborted"));
    console.log(colors.red({ error }));
  }
};

start();
