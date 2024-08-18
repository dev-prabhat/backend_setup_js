import mongoose from "mongoose";

// user Model Scheme
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // index: true,
    },
    fullname: {
      type: String,
      require: true,
      trim: true,
      index: true,
    },
    password:{
        type: String,
        require: [true, "Password is required"],
    }
  },
  { timestamps: true }
);


export const User = mongoose.model("User", userSchema);