import CustomError from "../utils/customError.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import getUserDoc from "../utils/getUserDoc.js";
import User from "../models/user.js";
import createMailOption from "../utils/createMailOptions.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import config from "../config/envConfig.js";

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
// export const verify = catchAsyncError(async (req, res, next) => {
//   if (!authMethod || authMethod !== "local") {
//     return next(new CustomError("authMethod is Empty or Invalid;", 400));
//   }
//   const userDoc = getUserDoc(req.body);
//   const user = await User.create(userDoc);
//   if (!user) return next(new CustomError("Internal Server Error", 500));
//   const token = user.getJwtToken();
//   const subject = "Verify User Email";
//   const options = createMailOption(token, user.email, subject);
//   await sendEmail(options);
//   res.status(200).json({
//     success: true,
//     message: "User Registered Successfully, Verify the email",
//   });
// });

// register user => /api/v1/auth/register (post)
// export const register = catchAsyncError(async (req, res, next) => {
//   const { authMethod } = req.body;
//   if (!authMethod || authMethod !== "local") {
//     return next(new CustomError("authMethod is Empty or Invalid;", 400));
//   }
//   const userDoc = getUserDoc(req.body);
//   const user = await User.create(userDoc);
//   if (!user) return next(new CustomError("Internal Server Error", 500));
//   const token = user.getJwtToken();
//   const subject = "Verify User Email";
//   const options = createMailOption(token, user.email, subject);
//   await sendEmail(options);
//   res.status(200).json({
//     success: true,
//     message: "User Registered Successfully, Verify the email",
//   });
// });
