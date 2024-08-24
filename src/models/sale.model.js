import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
      amount: { type: Number, required: true }, // Amount including GST
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
});

export const Sale = mongoose.model("Sale", saleSchema);
