import mongoose from "mongoose";

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
});

const User = mongoose.model("User", userSchema);

export default User;
