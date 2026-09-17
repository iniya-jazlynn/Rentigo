const express = require("express");

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getOwnerBookings,
  approveBooking,
  rejectBooking,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// ===================================================
// CUSTOMER ROUTES
// ===================================================

// Create Booking
router.post(
  "/",
  protect,
  authorize("customer"),
  createBooking
);

// Get My Bookings
router.get(
  "/my-bookings",
  protect,
  authorize("customer"),
  getMyBookings
);

// Cancel Booking
router.put(
  "/:id/cancel",
  protect,
  authorize("customer"),
  cancelBooking
);

// ===================================================
// OWNER ROUTES
// ===================================================

// Get Owner Booking Requests
router.get(
  "/owner",
  protect,
  authorize("owner"),
  getOwnerBookings
);

// Approve Booking
router.put(
  "/:id/approve",
  protect,
  authorize("owner"),
  approveBooking
);

// Reject Booking
router.put(
  "/:id/reject",
  protect,
  authorize("owner"),
  rejectBooking
);

// ===================================================
// COMMON ROUTES
// ===================================================

// Get Booking By ID
// IMPORTANT: Keep this route LAST.
// Otherwise '/owner' will be treated as ':id'.
router.get(
  "/:id",
  protect,
  getBookingById
);

module.exports = router;