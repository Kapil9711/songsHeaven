import User from "../models/user.js";
import catchAsyncError from "./catchAsyncError.js";
import CustomError from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const Authenticate = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers["authorization"] &&
    req.headers["authorization"].includes("Bearer")
  ) {
    token = req.headers.authorization?.split(" ")[1];
  }
  if (!token) {
    return next(
      new CustomError("Authentication failed, Token is required", 401)
    );
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode)
    return next(
      new CustomError("Authentication failed invalid or expired Token")
    );
  req.user = await User.findById(decode.userId);
  next();
});
