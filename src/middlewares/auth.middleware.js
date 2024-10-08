import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";

// authentication middleware
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw res
        .status(401)
        .json(new ApiError(401, "", ["Unauthorized request"]));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw res
        .status(401)
        .json(new ApiError(401, "", ["Invalid Access token"]));
    }

    req.user = user;
    next();
  } catch (error) {
    throw res.status(401).json(new ApiError(401, "", ["Invalid Access token"]));
  }
});
