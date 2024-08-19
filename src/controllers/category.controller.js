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
  const { name, gstRate } = req.body;

  if (!name || !gstRate) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["Name and gst  is missing"]));
  }

  const categoryCreated = await Category.create({
    name,
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

// updating category details
const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name, gstRate } = req.body;

  if (!isValidObjectId(categoryId)) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["category does not exist"]));
  }

  if (!name || !gstRate) {
    throw res.status(400).json(new ApiError(400, "", ["name or gst is empty"]));
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["failed to fetched category from DB"]));
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        name,
        gstRate,
      },
    },
    { new: true }
  );

  if(!updateCategory){
    throw res.status(500).json(new ApiError(500,'',["Error while updating category details"]));
  }

  return res
  .status(200)
  .json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
});

// const deleteCategory = asyncHandler(async (req,res) => {})

export { createCategory, getAllCategories };
