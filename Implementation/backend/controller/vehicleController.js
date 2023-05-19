const asyncHandler = require("express-async-handler");

const Vehicle = require("../models/vehicleModel");

//post
const addVehicle = asyncHandler(async (req, res) => {
  const { plateNo, vModel, fuelType, insuranceExpirationDate } = req.body;

  const vehicle = await Vehicle.create({
    plateNo,
    vModel,
    fuelType,
    insuranceExpirationDate,
  });

  vehicle
    ? res.status(201).json(vehicle)
    : res.status(400).json({ message: "Vehicle not created" });
});

//get
const readVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.find({});
  res.json(vehicle);
});

//get one vehicle
const getOneVehicle = async (req, res) => {
  const { id } = req.params;

  let vehicle = null;

  try {
    vehicle = await Vehicle.findOne({ _id: id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }

  // check if vehicle exists
  if (!vehicle) {
    return res.status(404).json({
      error: "vehicle not found",
    });
  }
  res.status(200).json({ vehicle });
};

//put
const updateVehicle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { vModel, fuelType, insuranceExpirationDate } = req.body;

  const vehicle = await Vehicle.findByIdAndUpdate(
    id,
    {
      vModel,
      fuelType,
      insuranceExpirationDate,
    },
    { new: true }
  );

  vehicle
    ? res.status(201).json(vehicle)
    : res.status(400).json({ message: "Vehicle not updated" });
});

//delete
const deleteVehicle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const vehicle = await Vehicle.findByIdAndDelete(id);

  vehicle
    ? res.status(200).json(vehicle)
    : res.status(400).json({ message: "Vehicle not deleted" });
});

// search vehicle by plate number
const searchVehicleByPlateNo = asyncHandler(async (req, res) => {
  const plateNo = req.params.plateNo;

  const vehicle = await Vehicle.findOne({ plateNo: plateNo });

  if (vehicle) {
    res.status(200).json(vehicle);
  } else {
    res.status(404).json({ message: "Vehicle not found" });
  }
});

const getVCount = asyncHandler(async (req, res) => {
  const availableCount = await Vehicle.countDocuments({ status: "AVAILABLE" });
  const unavailableCount = await Vehicle.countDocuments({
    status: "UNAVAILABLE",
  });
  res.json({ availableCount, unavailableCount });
});

module.exports = {
  addVehicle,
  readVehicle,
  getOneVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicleByPlateNo,
  getVCount,
};
