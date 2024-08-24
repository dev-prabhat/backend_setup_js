import mongoose from "mongoose";

// category model scheme
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      index: true,
      trim: true,
    },
    gstRate: {
      type: Number,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
