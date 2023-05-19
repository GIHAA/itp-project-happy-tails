const asyncHandler = require("express-async-handler");

const Availability = require("../models/availabilityModel");

//post
const addAvailability = asyncHandler(async (req, res) => {
  const { plateNo, reason, since, to, status } = req.body;

  const availability = await Availability.create({
    plateNo,
    reason,
    since,
    to,
    status: "AVAILABLE",
  });

  availability
    ? res.status(201).json(availability)
    : res.status(400).json({ message: "Availability not created" });
});

//get
const readAvailability = asyncHandler(async (req, res) => {
  const availability = await Availability.find({});
  res.json(availability);
});

//get one Availability
const getOneAvailability = async (req, res) => {
  const { id } = req.params;

  let availability = null;

  try {
    availability = await Availability.findOne({ _id: id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }

  // check if Availability exists
  if (!availability) {
    return res.status(404).json({
      error: "availability not found",
    });
  }
  res.status(200).json({ availability });
};

//put
const updateAvailability = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { reason, since, to, status } = req.body;

  const availability = await Availability.findByIdAndUpdate(
    id,
    {
      reason,
      since,
      to,
      status,
    },
    { new: true }
  );

  availability
    ? res.status(201).json(availability)
    : res.status(400).json({ message: "Availability not updated" });
});

//delete
const deleteAvailability = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const availability = await Availability.findByIdAndDelete(id);

  availability
    ? res.status(200).json(availability)
    : res.status(400).json({ message: "Availability not deleted" });
});

module.exports = {
  addAvailability,
  readAvailability,
  getOneAvailability,
  updateAvailability,
  deleteAvailability,
};
