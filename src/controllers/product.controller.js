import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/catrgory.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProduct = asyncHandler(async (req, res) => {
  const { productName, categoryName, productPrice } = req.body;

  if (!productName.trim() || !categoryName || !productPrice) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["required fields are not prvoided"]));
  }

  const categoryId = await Category.findOne({
    name: categoryName,
  });

  if (!categoryId) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["category does not exist"]));
  }

  const isProductExist = await Product.findOne({
    name:productName.toLowerCase()
  })

  if(isProductExist){
    throw res
    .status(403)
    .json(new ApiError(400, "", ["product already exist"]));
  }

  const productCreated = await Product.create({
    name:productName.toLowerCase(),
    price:productPrice,
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

const getAllProducts = asyncHandler(async (req,res) => {
  const allProducts = await Product.find({})

  if (!allProducts) {
    throw res
      .status(500)
      .json(
        new ApiError(500, "", [
          "Something went wrong while fetching categories from DB",
        ])
      );
  }

  if (!allProducts.length) {
    throw res.status(500).json(new ApiError(500, "", ["categories are empty"]));
  }
  return res.json(
    new ApiResponse(200, allProducts, "found all categories in DB")
  );
})

export { createProduct , getAllProducts};
