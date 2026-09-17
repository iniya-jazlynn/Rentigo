const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  getDashboardService,
  getAllUsersService,
  getAllVehiclesService,
  getAllBookingsService,
  verifyVehicleService,
  rejectVehicleService,
  blockUserService,
  unblockUserService,
  deleteUserService,
} = require("../services/adminService");

// Dashboard
const getDashboard = asyncHandler(async (req, res) => {
  const data = await getDashboardService();
  res.status(200).json(new ApiResponse(200, "Dashboard fetched successfully", data));
});

// Users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();
  res.status(200).json(new ApiResponse(200, "Users fetched successfully", users));
});

// Vehicles
const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles = await getAllVehiclesService();
  res.status(200).json(new ApiResponse(200, "Vehicles fetched successfully", vehicles));
});

// Bookings
const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await getAllBookingsService();
  res.status(200).json(new ApiResponse(200, "Bookings fetched successfully", bookings));
});

// Verify Vehicle
const verifyVehicle = asyncHandler(async (req, res) => {
  const vehicle = await verifyVehicleService(req.params.id);
  res.status(200).json(new ApiResponse(200, "Vehicle verified successfully", vehicle));
});

// Reject Vehicle
const rejectVehicle = asyncHandler(async (req, res) => {
  const vehicle = await rejectVehicleService(req.params.id);
  res.status(200).json(new ApiResponse(200, "Vehicle rejected successfully", vehicle));
});

// Block User
const blockUser = asyncHandler(async (req, res) => {
  const user = await blockUserService(req.params.id);
  res.status(200).json(new ApiResponse(200, "User blocked successfully", user));
});

// Unblock User
const unblockUser = asyncHandler(async (req, res) => {
  const user = await unblockUserService(req.params.id);
  res.status(200).json(new ApiResponse(200, "User unblocked successfully", user));
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  await deleteUserService(req.params.id);
  res.status(200).json(new ApiResponse(200, "User deleted successfully"));
});

module.exports = {
  getDashboard,
  getAllUsers,
  getAllVehicles,
  getAllBookings,
  verifyVehicle,
  rejectVehicle,
  blockUser,
  unblockUser,
  deleteUser,
};