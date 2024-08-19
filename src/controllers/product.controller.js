import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/catrgory.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, category, price } = req.body;

  if (!name || !category || !price) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["required fields are not prvoided"]));
  }

  const categoryId = await Category.findOne({
    name: category,
  });

  if (!categoryId) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["category does not exist"]));
  }

  const isProductExist = await Product.findOne({
    name,category: categoryId
  })

  if(isProductExist){
    throw res
    .status(403)
    .json(new ApiError(400, "", ["product already exist in the same category"]));
  }

  const productCreated = await Product.create({
    name,
    price,
    category: categoryId,
  });

  if (!productCreated) {
    throw res
      .status(500)
      .json(
        new ApiError(500, "", [
          "Something went wrong while registering user in DB",
        ])
      );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, productCreated, "Video uploaded to local server")
    );
});

export { createProduct };
