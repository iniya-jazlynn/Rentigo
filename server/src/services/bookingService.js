const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const ApiError = require("../utils/ApiError");

// ===============================
// Create Booking
// ===============================
const createBookingService = async (bookingData, customerId) => {
  const {
    vehicleId,
    startDate,
    endDate,
    bookingType,
  } = bookingData;

  // Find Vehicle
  const vehicle = await Vehicle.findById(vehicleId);

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  // Owner cannot book own vehicle
  if (vehicle.owner.toString() === customerId.toString()) {
    throw new ApiError(
      403,
      "You cannot book your own vehicle"
    );
  }

  // Vehicle must be verified
  if (!vehicle.isVerified) {
    throw new ApiError(
      400,
      "Vehicle is waiting for admin verification"
    );
  }

  // Vehicle must be available
  if (!vehicle.isAvailable) {
    throw new ApiError(
      400,
      "Vehicle is not available"
    );
  }

  // Prevent overlapping bookings
  const existingBooking = await Booking.findOne({
    vehicle: vehicleId,
    bookingStatus: {
      $in: ["Pending", "Confirmed"],
    },
    startDate: {
      $lte: new Date(endDate),
    },
    endDate: {
      $gte: new Date(startDate),
    },
  });

  if (existingBooking) {
    throw new ApiError(
      400,
      "Vehicle is already booked for the selected dates"
    );
  }

  // Calculate booking duration
  const start = new Date(startDate);
  const end = new Date(endDate);

  const totalDays =
    Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  if (totalDays <= 0) {
    throw new ApiError(
      400,
      "Invalid booking dates"
    );
  }

  // Calculate amount
  const totalAmount = totalDays * vehicle.rentPerDay;

  // Create booking
  const booking = await Booking.create({
    customer: customerId,
    owner: vehicle.owner,
    vehicle: vehicle._id,
    bookingType,
    startDate,
    endDate,
    totalDays,
    totalAmount,
  });

  // Mark vehicle unavailable
  vehicle.isAvailable = false;
  await vehicle.save();

  return booking;
};

// ===============================
// Customer Bookings
// ===============================
const getMyBookingsService = async (customerId) => {
  return await Booking.find({
    customer: customerId,
  })
    .populate("vehicle")
    .populate("owner", "fullName phone");
};

// ===============================
// Get Booking By ID
// ===============================
const getBookingByIdService = async (bookingId) => {
  const booking = await Booking.findById(bookingId)
    .populate("vehicle")
    .populate("customer", "fullName email")
    .populate("owner", "fullName email");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return booking;
};

// ===============================
// Cancel Booking
// ===============================
const cancelBookingService = async (
  bookingId,
  customerId
) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    customer: customerId,
  });

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  booking.bookingStatus = "Cancelled";
  await booking.save();

  // Make vehicle available again
  await Vehicle.findByIdAndUpdate(
    booking.vehicle,
    {
      isAvailable: true,
    }
  );

  return booking;
};

// ===============================
// Owner Bookings
// ===============================
const getOwnerBookingsService = async (ownerId) => {
 console.log("Owner ID:", ownerId);

const bookings = await Booking.find({
  owner: ownerId,
});

console.log("Bookings:", bookings);

return await Booking.find({
  owner: ownerId,
})
.populate("customer", "fullName phone")
.populate("vehicle");
};

// ===============================
// Approve Booking
// ===============================
const approveBookingService = async (
  bookingId,
  ownerId
) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    owner: ownerId,
  });

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  booking.bookingStatus = "Confirmed";

  await booking.save();

  return booking;
};

// ===============================
// Reject Booking
// ===============================
const rejectBookingService = async (
  bookingId,
  ownerId
) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    owner: ownerId,
  });

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  booking.bookingStatus = "Cancelled";

  await booking.save();

  await Vehicle.findByIdAndUpdate(
    booking.vehicle,
    {
      isAvailable: true,
    }
  );

  return booking;
};

module.exports = {
  createBookingService,
  getMyBookingsService,
  getBookingByIdService,
  cancelBookingService,
  getOwnerBookingsService,
  approveBookingService,
  rejectBookingService,
};