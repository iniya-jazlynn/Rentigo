const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  addVehicleService,
  getAllVehiclesService,
  getOwnerVehiclesService,
  getVehicleByIdService,
  updateVehicleService,
  deleteVehicleService,
} = require("../services/vehicleService");

// Add Vehicle
const addVehicle = asyncHandler(async (req, res) => {
  const vehicle = await addVehicleService(req.body, req.user._id);

  res.status(201).json(
    new ApiResponse(201, "Vehicle added successfully", vehicle)
  );
});

// Get All Vehicles
const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles = await getAllVehiclesService();

  res.status(200).json(
    new ApiResponse(200, "Vehicles fetched successfully", vehicles)
  );
});

// Get My Vehicles
const getMyVehicles = asyncHandler(async (req, res) => {
  const vehicles = await getOwnerVehiclesService(req.user._id);

  res.status(200).json(
    new ApiResponse(200, "Owner vehicles fetched", vehicles)
  );
});

// Get Vehicle By ID
const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await getVehicleByIdService(req.params.id);

  res.status(200).json(
    new ApiResponse(200, "Vehicle fetched successfully", vehicle)
  );
});

// Update Vehicle
const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await updateVehicleService(
    req.params.id,
    req.user._id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(200, "Vehicle updated successfully", vehicle)
  );
});

// Delete Vehicle
const deleteVehicle = asyncHandler(async (req, res) => {
  await deleteVehicleService(req.params.id, req.user._id);

  res.status(200).json(
    new ApiResponse(200, "Vehicle deleted successfully")
  );
});

module.exports = {
  addVehicle,
  getAllVehicles,
  getMyVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
