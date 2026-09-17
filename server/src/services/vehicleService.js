const Vehicle = require("../models/Vehicle");
const ApiError = require("../utils/ApiError");

// Add Vehicle
const addVehicleService = async (vehicleData, ownerId) => {
  const existingVehicle = await Vehicle.findOne({
    registrationNumber: vehicleData.registrationNumber,
  });

  if (existingVehicle) {
    throw new ApiError(409, "Vehicle already exists");
  }

  const vehicle = await Vehicle.create({
    ...vehicleData,
    owner: ownerId,
  });

  return vehicle;
};

// Get All Verified Vehicles
const getAllVehiclesService = async () => {
  return await Vehicle.find({ isVerified: true }).populate(
    "owner",
    "fullName email phone"
  );
};

// Get Owner Vehicles
const getOwnerVehiclesService = async (ownerId) => {
  return await Vehicle.find({ owner: ownerId });
};

// Get Vehicle By Id
const getVehicleByIdService = async (id) => {
  const vehicle = await Vehicle.findById(id).populate(
    "owner",
    "fullName email phone"
  );

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return vehicle;
};

// Update Vehicle
const updateVehicleService = async (vehicleId, ownerId, updateData) => {
  const vehicle = await Vehicle.findOne({
    _id: vehicleId,
    owner: ownerId,
  });

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  Object.assign(vehicle, updateData);

  await vehicle.save();

  return vehicle;
};

// Delete Vehicle
const deleteVehicleService = async (vehicleId, ownerId) => {
  const vehicle = await Vehicle.findOne({
    _id: vehicleId,
    owner: ownerId,
  });

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  await Vehicle.findByIdAndDelete(vehicleId);
};

module.exports = {
  addVehicleService,
  getAllVehiclesService,
  getOwnerVehiclesService,
  getVehicleByIdService,
  updateVehicleService,
  deleteVehicleService,
};