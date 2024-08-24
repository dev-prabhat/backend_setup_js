import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Sale } from "../models/sale.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// add sales details
const createSale = asyncHandler(async (req, res) => {
  // const { productId } = req.params;
  const salesData = req.body;
  let totalAmount = 0;

  if (!salesData.length) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["required fields are not prvoided"]));
  }

  const saleProducts = await Promise.all(
    salesData.map(async (item) => {
      if (!item._id || !item.product || !item.category || !item.price || !item.tax || !item.gstRate) {
        throw res
          .status(400)
          .json(new ApiError(400, "", ["required fields are not prvoided"]));
      }
      const product = await Product.findById(item._id).populate("category");

      const price = parseInt(product.price);
      const quantity = parseInt(item.quantity) || 1;
      const gstRate = product.category.gstRate;

      const amount = price * (1 + gstRate / 100) * quantity;

      totalAmount += amount;
      return {
        category: product.category,
        product: product,
        quantity: item.quantity,
        amount: amount,
      };
    })
  );

  const sale = await Sale.create({
    products: saleProducts,
    totalAmount,
  });

  if (!sale) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["server error please try again"]));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, sale, "Sales details uploaded"));
});

// get sales for a day
const getSaleForADay = asyncHandler(async (req, res) => {
  const { date } = req.params;

  if (!date) {
    throw res.status(400).json(new ApiError(400, "", ["date is not prvoided"]));
  }

  const startOfDay = new Date(date).setHours(0, 0, 0, 0);
  const endOfDay = new Date(date).setHours(23, 59, 59, 999);

  const sales = await Sale.find({
    saleDate: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  })
    .populate("products.product")
    .populate("products.category");

  if (!sales.length) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["sales data for this dates does not exist"]));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, sales, "Sales details found"));
});

// get revenue for a day
const getRevenueForADay = asyncHandler(async (req, res) => {
  const { date } = req.params;

  if (!date) {
    throw res.status(400).json(new ApiError(400, "", ["date is not prvoided"]));
  }

  const startOfDay = new Date(date).setHours(0, 0, 0, 0);
  const endOfDay = new Date(date).setHours(23, 59, 59, 999);

  const sales = await Sale.aggregate([
    {
      $match: {
        saleDate: {
          $gte: new Date(startOfDay),
          $lte: new Date(endOfDay),
        },
      },
    },
    { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
  ]);

  if (!sales.length) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["failed to fetch sales details from DB"]));
  }

  const totalRevenue = sales.length > 0 ? sales[0].totalRevenue : 0;

  return res
    .status(200)
    .json(new ApiResponse(200, totalRevenue, "total revenue for a day"));
});

// get revenue for a month
const getRevenueForAMonth = asyncHandler(async (req, res) => {
  const { month, year } = req.params;

  if (!month || !year) {
    throw res.status(400).json(new ApiError(400, "", ["date is not prvoided"]));
  }

  const parsedYear = parseInt(req.params.year);
  const parsedmonth = parseInt(req.params.month) - 1; // Month is zero-indexed in JS
  const startOfMonth = new Date(parsedYear, parsedmonth, 1);
  const endOfMonth = new Date(parsedYear, parsedmonth + 1, 0, 23, 59, 59, 999);

  const sales = await Sale.aggregate([
    { $match: { saleDate: { $gte: startOfMonth, $lte: endOfMonth } } },
    { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
  ]);

  if (!sales.length) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["failed to fetch sales details from DB"]));
  }

  const totalRevenue = sales.length > 0 ? sales[0].totalRevenue : 0;

  return res
    .status(200)
    .json(new ApiResponse(200, totalRevenue, "total revenue for a month"));
});

// get revenue for a year
const getRevenueForAYear = asyncHandler(async (req, res) => {
  const { year } = req.params;

  if (!year) {
    throw res.status(400).json(new ApiError(400, "", ["date is not prvoided"]));
  }

  const parsedYear = parseInt(req.params.year);
  const startOfYear = new Date(parsedYear, 0, 1);
  const endOfYear = new Date(parsedYear, 11, 31, 23, 59, 59, 999);

  const sales = await Sale.aggregate([
    { $match: { saleDate: { $gte: startOfYear, $lte: endOfYear } } },
    { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
  ]);

  if (!sales.length) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["failed to fetch sales details from DB"]));
  }

  const totalRevenue = sales.length > 0 ? sales[0].totalRevenue : 0;

  return res
    .status(200)
    .json(new ApiResponse(200, totalRevenue, "total revenue for a year"));
});

export {
  createSale,
  getSaleForADay,
  getRevenueForADay,
  getRevenueForAMonth,
  getRevenueForAYear,
};
