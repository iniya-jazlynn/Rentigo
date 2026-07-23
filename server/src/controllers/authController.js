const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const generateToken = require("../utils/generateToken");

const {
  registerUserService,
  loginUserService,
} = require("../services/authService");

const registerUser = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  res.status(201).json(
    new ApiResponse(
      201,
      "User registered successfully",
      user
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserService(email, password);

  const token = generateToken(user._id);

  user.password = undefined;

  res.status(200).json(
    new ApiResponse(
      200,
      "Login successful",
      {
        token,
        user,
      }
    )
  );
});
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      "Current user fetched successfully",
      req.user
    )
  );
});
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, "Logged out successfully")
  );
});
module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};