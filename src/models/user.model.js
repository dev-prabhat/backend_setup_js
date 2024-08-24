import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// user Model Scheme
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    isAdmin:{
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10); // will run every time before saving data so that's why we added an if check
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  const isPasswordMatched = await bcrypt.compare(password, this.password);
  return isPasswordMatched;
};

userSchema.methods.generateAccessToken = function () {
  const generatedAccessToken = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
  return generatedAccessToken;
};

export const User = mongoose.model("User", userSchema);
