const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");
const ApiError = require("../utils/ApiError");

// =============================
// Dashboard Statistics
// =============================
const getDashboardService = async () => {
  const totalUsers = await User.countDocuments();

  const totalCustomers = await User.countDocuments({
    role: "customer",
  });

  const totalOwners = await User.countDocuments({
    role: "owner",
  });

  const totalDrivers = await User.countDocuments({
    role: "driver",
  });

  const totalVehicles = await Vehicle.countDocuments();

  const verifiedVehicles = await Vehicle.countDocuments({
    isVerified: true,
  });

  const pendingVehicles = await Vehicle.countDocuments({
    isVerified: false,
  });

  const totalBookings = await Booking.countDocuments();

  const completedBookings = await Booking.countDocuments({
    bookingStatus: "Confirmed",
  });

  const totalRevenue = await Booking.aggregate([
    {
      $match: {
        bookingStatus: "Confirmed",
      },
    },
    {
      $group: {
        _id: null,
        revenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  return {
    totalUsers,
    totalCustomers,
    totalOwners,
    totalDrivers,
    totalVehicles,
    verifiedVehicles,
    pendingVehicles,
    totalBookings,
    completedBookings,
    totalRevenue:
      totalRevenue.length > 0
        ? totalRevenue[0].revenue
        : 0,
  };
};

// =============================
// Get All Users
// =============================
const getAllUsersService = async () => {
  return await User.find().select("-password");
};

// =============================
// Get All Vehicles
// =============================
const getAllVehiclesService = async () => {
  return await Vehicle.find().populate(
    "owner",
    "fullName email phone"
  );
};

// =============================
// Get All Bookings
// =============================
const getAllBookingsService = async () => {
  return await Booking.find()
    .populate("customer", "fullName email")
    .populate("owner", "fullName email")
    .populate("vehicle");
};

// Verify Vehicle
const verifyVehicleService = async (id) => {
  const vehicle = await Vehicle.findById(id);

  if (!vehicle) throw new ApiError(404, "Vehicle not found");

  vehicle.isVerified = true;
  await vehicle.save();

  return vehicle;
};

// Reject Vehicle
const rejectVehicleService = async (id) => {
  const vehicle = await Vehicle.findById(id);

  if (!vehicle) throw new ApiError(404, "Vehicle not found");

  vehicle.isVerified = false;
  await vehicle.save();

  return vehicle;
};

// Block User
const blockUserService = async (id) => {
  const user = await User.findById(id);

  if (!user) throw new ApiError(404, "User not found");

  user.isActive = false;
  await user.save();

  return user;
};

// Unblock User
const unblockUserService = async (id) => {
  const user = await User.findById(id);

  if (!user) throw new ApiError(404, "User not found");

  user.isActive = true;
  await user.save();

  return user;
};

// Delete User
const deleteUserService = async (id) => {
  const user = await User.findById(id);

  if (!user) throw new ApiError(404, "User not found");

  await User.findByIdAndDelete(id);
};

module.exports = {
  getDashboardService,
  getAllUsersService,
  getAllVehiclesService,
  getAllBookingsService,
  verifyVehicleService,
  rejectVehicleService,
  blockUserService,
  unblockUserService,
  deleteUserService,
};