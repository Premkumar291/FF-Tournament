import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    profileImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken : String,
    verificationTokenExpiresAt : Date
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;