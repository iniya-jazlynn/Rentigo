const express = require("express");
const authorize = require("../middleware/roleMiddleware");

const {
  addVehicle,
  getAllVehicles,
  getMyVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("owner"), addVehicle);

router.get("/", getAllVehicles);

router.get("/my-vehicles", protect, authorize("owner"), getMyVehicles);

router.get("/:id", getVehicleById);

router.put("/:id", protect, authorize("owner"), updateVehicle);

router.delete("/:id", protect, authorize("owner"), deleteVehicle);

module.exports = router;