const DriverProfile = require("../models/DriverProfile");
const Booking = require("../models/Booking");
const ApiError = require("../utils/ApiError");

// ===========================================
// Register Driver
// ===========================================
const registerDriverService = async (data, userId) => {
  const existing = await DriverProfile.findOne({
    user: userId,
  });

  if (existing) {
    throw new ApiError(400, "Driver profile already exists");
  }

  const driver = await DriverProfile.create({
    user: userId,
    ...data,
  });

  return driver;
};

// ===========================================
// Get Driver Profile
// ===========================================
const getDriverProfileService = async (userId) => {
  const driver = await DriverProfile.findOne({
    user: userId,
  }).populate("user", "fullName email phone");

  if (!driver) {
    throw new ApiError(404, "Driver profile not found");
  }

  return driver;
};

// ===========================================
// Update Driver Profile
// ===========================================
const updateDriverProfileService = async (userId, data) => {
  const driver = await DriverProfile.findOne({
    user: userId,
  });

  if (!driver) {
    throw new ApiError(404, "Driver profile not found");
  }

  driver.licenseNumber =
    data.licenseNumber || driver.licenseNumber;

  driver.aadhaarNumber =
    data.aadhaarNumber || driver.aadhaarNumber;

  driver.experience =
    data.experience ?? driver.experience;

  driver.currentLocation =
    data.currentLocation || driver.currentLocation;

  await driver.save();

  return driver;
};

// ===========================================
// Toggle Driver Availability
// ===========================================
const toggleAvailabilityService = async (userId) => {
  const driver = await DriverProfile.findOne({
    user: userId,
  });

  if (!driver) {
    throw new ApiError(404, "Driver profile not found");
  }

  driver.isAvailable = !driver.isAvailable;

  await driver.save();

  return driver;
};

// ===========================================
// Driver Ride History
// ===========================================
const getDriverRidesService = async (userId) => {
  const rides = await Booking.find({
    driver: userId,
  })
    .populate("customer", "fullName phone")
    .populate("vehicle");

  return rides;
};

// ===========================================
// Driver Earnings
// ===========================================
const getDriverEarningsService = async (userId) => {
  const driver = await DriverProfile.findOne({
    user: userId,
  });

  if (!driver) {
    throw new ApiError(404, "Driver profile not found");
  }

  return {
    totalRides: driver.totalRides,
    totalEarnings: driver.totalEarnings,
  };
};

// ===========================================
// Assign Driver to Booking
// ===========================================
const assignRideService = async (
  bookingId,
  driverId
) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  booking.driver = driverId;
  booking.rideStatus = "Assigned";

  await booking.save();

  return booking;
};
// ===========================================
// Driver Accept Ride
// ===========================================
const acceptRideService = async (bookingId, driverId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    driver: driverId,
  });

  if (!booking) {
    throw new ApiError(
      404,
      "Assigned booking not found"
    );
  }

  if (booking.rideStatus !== "Assigned") {
    throw new ApiError(
      400,
      "Ride cannot be accepted"
    );
  }

  booking.rideStatus = "Accepted";

  await booking.save();

  return booking;
};


// ===========================================
// Driver Start Ride
// ===========================================
const startRideService = async (bookingId, driverId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    driver: driverId,
  });

  if (!booking) {
    throw new ApiError(
      404,
      "Assigned booking not found"
    );
  }

  if (booking.rideStatus !== "Accepted") {
    throw new ApiError(
      400,
      "Ride must be accepted before starting"
    );
  }

  booking.rideStatus = "Started";

  await booking.save();

  return booking;
};


// ===========================================
// Driver Complete Ride
// ===========================================
const completeRideService = async (bookingId, driverId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    driver: driverId,
  });

  if (!booking) {
    throw new ApiError(
      404,
      "Assigned booking not found"
    );
  }

  if (booking.rideStatus !== "Started") {
    throw new ApiError(
      400,
      "Ride must be started before completing"
    );
  }

  booking.rideStatus = "Completed";
  booking.bookingStatus = "Completed";

  await booking.save();

  // Update driver statistics
  const driver = await DriverProfile.findOne({
    user: driverId,
  });

  if (driver) {
    driver.totalRides += 1;
    driver.totalEarnings += booking.totalAmount;

    await driver.save();
  }

  return booking;
};
module.exports = {
  registerDriverService,
  getDriverProfileService,
  updateDriverProfileService,
  toggleAvailabilityService,
  assignRideService,
  getDriverRidesService,
  getDriverEarningsService,
  assignRideService,
  acceptRideService,
  startRideService,
  completeRideService,
};