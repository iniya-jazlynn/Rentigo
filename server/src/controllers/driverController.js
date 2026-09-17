const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  registerDriverService,
  getDriverProfileService,
  updateDriverProfileService,
  toggleAvailabilityService,
  getDriverRidesService,
  getDriverEarningsService,
  assignRideService,
  acceptRideService,
  startRideService,
  completeRideService,
} = require("../services/driverService");

// Register Driver
const registerDriver = asyncHandler(async (req, res) => {
  const driver = await registerDriverService(
    req.body,
    req.user._id
  );

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Driver registered successfully",
        driver
      )
    );
});

// Get Driver Profile
const getDriverProfile = asyncHandler(async (req, res) => {
  const driver = await getDriverProfileService(
    req.user._id
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Driver profile fetched successfully",
        driver
      )
    );
});

// Update Driver Profile
const updateDriverProfile = asyncHandler(async (req, res) => {
  const driver = await updateDriverProfileService(
    req.user._id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Driver profile updated successfully",
      driver
    )
  );
});

// Toggle Availability
const toggleAvailability = asyncHandler(async (req, res) => {
  const driver = await toggleAvailabilityService(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Availability updated successfully",
      driver
    )
  );
});

//get driver rides
const getDriverRides = asyncHandler(async (req, res) => {
  const rides = await getDriverRidesService(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Driver rides fetched successfully",
      rides
    )
  );
});

//get driver earnings
const getDriverEarnings = asyncHandler(async (req, res) => {
  const earnings =
    await getDriverEarningsService(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Driver earnings fetched successfully",
      earnings
    )
  );
});

//assign ride to driver
const assignRide = asyncHandler(async (req, res) => {
  const booking = await assignRideService(
    req.params.bookingId,
    req.body.driverId
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Driver assigned successfully",
      booking
    )
  );
});
// ===========================================
// Accept Ride
// ===========================================
const acceptRide = asyncHandler(async (req, res) => {
  const booking = await acceptRideService(
    req.params.bookingId,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Ride accepted successfully",
      booking
    )
  );
});


// ===========================================
// Start Ride
// ===========================================
const startRide = asyncHandler(async (req, res) => {
  const booking = await startRideService(
    req.params.bookingId,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Ride started successfully",
      booking
    )
  );
});


// ===========================================
// Complete Ride
// ===========================================
const completeRide = asyncHandler(async (req, res) => {
  const booking = await completeRideService(
    req.params.bookingId,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Ride completed successfully",
      booking
    )
  );
});
module.exports = {
  registerDriver,
  getDriverProfile,
  updateDriverProfile,
  toggleAvailability,
  getDriverRides,
  getDriverEarnings,
  assignRide,
  acceptRide,
  startRide,
  completeRide,
};