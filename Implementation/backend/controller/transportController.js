const asyncHandler = require("express-async-handler");
const Transport = require("../models/transportModel");

const addTransport = asyncHandler(async (req, res) => {
  const {
    customerId,
    plocation,
    dlocation,
    petType,
    petGender,
    date,
    time,
    vaccineStatus,
    count,
  } = req.body;
  const transport = await Transport.create({
    customerId,
    plocation,
    dlocation,
    petType,
    petGender,
    date,
    time,
    vaccineStatus,
    count,
    status: "PENDING",
  });
  transport
    ? res.status(201).json(transport)
    : res.status(400).json({ message: "Booking not created" });
});

const readTransport = asyncHandler(async (req, res) => {
  const pendingBookings = await Transport.find({ "status.value": "PENDING" });
  const acceptedBookings = await Transport.find({
    "status.value": "ACCEPTED",
    acceptedBy: { $ne: null },
  });
  const rejectedBookings = await Transport.find({ "status.value": "REJECTED" });
  res.json({ pendingBookings, acceptedBookings, rejectedBookings });
});

const updateTransport = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {
    customerId,
    plocation,
    dlocation,
    petType,
    petGender,
    date,
    time,
    vaccineStatus,
    count,
    status,
  } = req.body;
  const transport = await Transport.findByIdAndUpdate(
    id,
    {
      customerId,
      plocation,
      dlocation,
      petType,
      petGender,
      date,
      time,
      vaccineStatus,
      count,
      status,
    },
    { new: true }
  );
  transport
    ? res.status(200).json(transport)
    : res.status(400).json({ message: "Booking not updated" });
});

const deleteTransport = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const transport = await Transport.findByIdAndDelete(id);
  transport
    ? res.status(200).json(transport)
    : res.status(400).json({ message: "Booking not deleted" });
});

const getCount = asyncHandler(async (req, res) => {
  const pendingCount = await Transport.countDocuments({ status: "PENDING" });
  const acceptedCount = await Transport.countDocuments({ status: "ACCEPTED" });
  res.json({ pendingCount, acceptedCount });
});

module.exports = {
  addTransport,
  readTransport,
  updateTransport,
  deleteTransport,
  getCount,
};
