import CustomError from "../utils/customError.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import getUserDoc from "../utils/getUserDoc.js";
import User from "../models/user.js";
import createMailOption from "../utils/createMailOptions.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import config from "../config/envConfig.js";
import mongoose from "mongoose";

// register user => /api/v1/auth/register (post)
export const register = catchAsyncError(async (req, res, next) => {
  const { authMethod } = req.body;
  if (!authMethod || authMethod !== "local") {
    return next(new CustomError("authMethod is Empty or Invalid;", 400));
  }
  const userDoc = getUserDoc(req.body);
  const user = await User.create(userDoc);
  if (!user) return next(new CustomError("Internal Server Error", 500));
  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
    expiresIn: "1d",
  });
  const subject = "Verify User Email";
  const options = createMailOption(token, user.email, subject);
  await sendEmail(options);
  res.status(200).json({
    success: true,
    message: "User Registered Successfully, Verify the email",
  });
});

// verify user => /api/v1/auth/verify (get)
export const verify = catchAsyncError(async (req, res, next) => {
  const { token } = req.query;
  if (!token) return next(new CustomError("Token is Required", 400));
  const decode = jwt.verify(token, config.JWT_SECRET);
  if (!decode) return next(new CustomError("Token is Invalid or Expired", 400));
  // check if the id is a validObject id
  if (!mongoose.Types.ObjectId.isValid(decode.userId)) {
    return next(new CustomError("Invalid UserId", 400));
  }
  const user = await User.findByIdAndUpdate(
    decode.userId,
    {
      $set: { isVerified: true },
    },
    { new: true }
  );
  if (!user) return next(new CustomError("User not Found", 404));
  res.status(200).send("Email Verified Successfully");
});

// login user => /api/v1/auth/login (post)
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new CustomError("User not Found", 404));
  if (!user.isVerified)
    return next(new CustomError("Email is not Verified", 400));
  // match the enered user password
  const isPassMatch = await user.checkPassword(password);
  if (!isPassMatch)
    return next(new CustomError("Incorrect Username or Password", 404));
  const token = await user.getJwtToken();
  res.status(200).json({
    success: true,
    message: "Login Successfull",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    },
    token,
  });
});

// logout user => /api/v1/auth/logout (get);
export const logout = catchAsyncError(async (req, res, next) => {
  if (req.logout) {
    req.logout((err) => {
      if (err) return next(new CustomError("Error logging out", 500));
    });
  }
  res.status(200).json({ message: "Logout Successfull", success: true });
});

// google user login => /api/v1/auth/google/callback (get)
export const googleLogin = catchAsyncError(async (req, res, next) => {
  const token = jwt.sign({ userId: req.user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_TIME,
  });
  res.redirect(
    `${config.CALL_BACK_URL}?token=${token}&&user=${JSON.stringify(req.user)}`
  );
});
