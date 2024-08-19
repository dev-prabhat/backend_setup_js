import mongoose from "mongoose";

// product model scheme
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
