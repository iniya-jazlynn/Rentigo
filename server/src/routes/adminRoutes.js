const express = require("express");

const {
  getDashboard,
  getAllUsers,
  getAllVehicles,
  getAllBookings,
  verifyVehicle,
  rejectVehicle,
  blockUser,
  unblockUser,
  deleteUser,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Protect all admin routes
router.use(protect);
router.use(authorize("admin"));

// Dashboard
router.get("/dashboard", getDashboard);

// Users
router.get("/users", getAllUsers);
router.put("/users/:id/block", blockUser);
router.put("/users/:id/unblock", unblockUser);
router.delete("/users/:id", deleteUser);

// Vehicles
router.get("/vehicles", getAllVehicles);
router.put("/vehicles/:id/verify", verifyVehicle);
router.put("/vehicles/:id/reject", rejectVehicle);

// Bookings
router.get("/bookings", getAllBookings);

module.exports = router;