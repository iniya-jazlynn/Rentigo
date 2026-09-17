const express = require("express");

const authRoutes = require("./authRoutes");
const vehicleRoutes = require("./vehicleRoutes");
const bookingRoutes = require("./bookingRoutes");
const adminRoutes = require("./adminRoutes");
const driverRoutes = require("./driverRoutes");

const router = express.Router();

// Authentication Routes
router.use("/auth", authRoutes);
router.use("/drivers", driverRoutes);
router.use("/bookings", bookingRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/admin", adminRoutes);

module.exports = router;