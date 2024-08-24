import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false });
    return accessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username , isAdmin} = req.body;

  if (!username && !email) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["username or email is required"]));
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw res
      .status(409)
      .json(
        new ApiError(409, "", ["User with email or username already exist"])
      );
  }

  const createdUser = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    isAdmin: isAdmin || false
  });

  const user = await User.findById(createdUser._id).select("-password");

  const accessToken = await generateAccessTokens(user._id);

  if (!createdUser) {
    throw res
      .status(500)
      .json(
        new ApiError(500, "", [
          "Something went wrong while registering user in DB",
        ])
      );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, { user, accessToken }, "User created successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password  } = req.body;

  if (!username && !email) {
    throw res
      .status(400)
      .json(new ApiError(400, "", ["username or email is required"]));
  }

  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!isUserExist) {
    throw res.status(404).json(new ApiError(404, "", ["User not found"]));
  }

  const isPasswordValid = await isUserExist.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw res
      .status(401)
      .json(new ApiError(401, "", ["Invalid user credentials"]));
  }

  const user = await User.findById(isUserExist._id).select("-password");

  const accessToken = await generateAccessTokens(user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        accessToken,
      },
      "User logged in succcessfully"
    )
  );
});

export { registerUser, loginUser };
