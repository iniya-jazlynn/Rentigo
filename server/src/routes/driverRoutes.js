const express = require("express");

const {
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
} = require("../controllers/driverController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/register",
  protect,
  authorize("driver"),
  registerDriver
);

router.get(
  "/profile",
  protect,
  authorize("driver"),
  getDriverProfile
);

router.put(
  "/profile",
  protect,
  authorize("driver"),
  updateDriverProfile
);

router.put(
  "/availability",
  protect,
  authorize("driver"),
  toggleAvailability
);

router.get(
  "/rides",
  protect,
  authorize("driver"),
  getDriverRides
);

router.get(
  "/earnings",
  protect,
  authorize("driver"),
  getDriverEarnings
);

router.put(
  "/assign/:bookingId",
  protect,
  authorize("admin", "owner"),
  assignRide
);
// ===========================================
// Driver Ride Lifecycle
// ===========================================

router.put(
  "/rides/:bookingId/accept",
  protect,
  authorize("driver"),
  acceptRide
);

router.put(
  "/rides/:bookingId/start",
  protect,
  authorize("driver"),
  startRide
);

router.put(
  "/rides/:bookingId/complete",
  protect,
  authorize("driver"),
  completeRide
);
module.exports = router;