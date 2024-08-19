import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10); // will run every time before saving data so that's why we added an if check
  next();
});

userSchema.methods.isPasswordCorrect = async function(password){
  const isPasswordMatched = await bcrypt.compare(password, this.prototype)
  return isPasswordMatched
}

export const User = mongoose.model("User", userSchema);