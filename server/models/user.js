import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/envConfig.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      this.authMethod === "local";
    },
  },
  googleId: {
    type: String,
    required: function () {
      return this.authMethod === "google";
    },
  },
  profilePic: String,
  authMethod: {
    type: String,
    enum: {
      values: ["local", "google"],
      message: (value) => `${value} cannot be selected`,
    },
    required: [true, "authMethod is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// check password
userSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// getJwtToken
userSchema.methods.getJwtToken = async function () {
  return await jwt.sign({ userId: this._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_TIME,
  });
};

userSchema.index({ email: 1 });
const User = mongoose.model("User", userSchema);

export default User;
