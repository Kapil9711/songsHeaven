import express from "express";
import http from "http";
import connectDB from "./config/db.js";
import config from "./config/envConfig.js";
import colors from "colors/safe.js";
import authRouter from "./router/authRouter.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

// express setup
const app = express();
const server = http.createServer(app);

// home route
app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/v1/auth", authRouter);

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
