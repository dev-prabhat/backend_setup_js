import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/catrgory.model.js";
import { isValidObjectId } from "mongoose";

// get all the categories
const getAllCategories = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({});

  if (!allCategories) {
    throw res
      .status(500)
      .json(
        new ApiError(500, "", [
          "Something went wrong while fetching categories from DB",
        ])
      );
  }

  if (!allCategories.length) {
    throw res.status(500).json(new ApiError(500, "", ["categories are empty"]));
  }
  return res.json(
    new ApiResponse(200, allCategories, "found all categories in DB")
  );
});

// create different product categories
const createCategory = asyncHandler(async (req, res) => {
  const { category, gstRate } = req.body;

  if (!category.trim() || !gstRate) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["CategoryName and GSTRate are missing"]));
  }

  const categoryAlreadyExist = await Category.findOne({name: category.toLowerCase()})

  if(categoryAlreadyExist){
    throw res
      .status(500)
      .json(
        new ApiError(500, "", [
          "Category Already exist",
        ])
      );
  }

  const categoryCreated = await Category.create({
    name:category.toLowerCase(),
    gstRate,
  });

  if (!categoryCreated) {
    throw res
      .status(500)
      .json(
        new ApiError(500, "", [
          "Something went wrong while creating category in DB",
        ])
      );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, categoryCreated, "Created Category Successfully...")
    );
});


export { createCategory, getAllCategories };
