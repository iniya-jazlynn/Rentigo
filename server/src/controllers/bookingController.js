const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createBookingService,
  getMyBookingsService,
  getBookingByIdService,
  cancelBookingService,
  getOwnerBookingsService,
  approveBookingService,
  rejectBookingService,
} = require("../services/bookingService");

// Create Booking
const createBooking = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.body, req.user._id);

  res
    .status(201)
    .json(new ApiResponse(201, "Booking created successfully", booking));
});

// My Bookings
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await getMyBookingsService(req.user._id);

  res
    .status(200)
    .json(new ApiResponse(200, "Bookings fetched successfully", bookings));
});

// Get Booking By ID
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await getBookingByIdService(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Booking fetched successfully", booking));
});

// Cancel Booking
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await cancelBookingService(
    req.params.id,
    req.user._id
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Booking cancelled successfully", booking));
});
// Owner Bookings
const getOwnerBookings = asyncHandler(async (req, res) => {
  const bookings = await getOwnerBookingsService(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Owner bookings fetched successfully",
      bookings
    )
  );
});

// Approve Booking
const approveBooking = asyncHandler(async (req, res) => {
  const booking = await approveBookingService(
    req.params.id,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Booking approved successfully",
      booking
    )
  );
});

// Reject Booking
const rejectBooking = asyncHandler(async (req, res) => {
  const booking = await rejectBookingService(
    req.params.id,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Booking rejected successfully",
      booking
    )
  );
});
module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getOwnerBookings,
  approveBooking,
  rejectBooking,
};