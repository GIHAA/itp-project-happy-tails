const asyncHandler = require("express-async-handler");
const Transport = require("../models/transportModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const addTransport = asyncHandler(async (req, res) => {
  const { userName, plocation, date, time, count, email, phone } = req.body;
  const transport = await Transport.create({
    userName,
    plocation,
    date,
    time,
    count,
    email,
    phone,
    status: "PENDING",
  });
  transport
    ? res.status(201).json(transport)
    : res.status(400).json({ message: "Booking not created" });
});

const readTransport = asyncHandler(async (req, res) => {
  const transport = await Transport.find({});
  res.json(transport);
});

const updateTransport = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { userName, plocation, date, time, count, email, phone, status } =
    req.body;
  const transport = await Transport.findByIdAndUpdate(
    id,
    {
      userName,
      plocation,
      date,
      time,
      count,
      email,
      phone,
      status,
    },
    { new: true }
  );

  if (status === "ACCEPTED" || status === "REJECTED") {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const message = `
      <h1>Transport Service Request ${status}</h1>
      <p>Dear ${transport.userName},</p>
      <p>Your booking with the following details:</p>
      <p><strong>Pick-up Location:</strong> ${transport.plocation}</p>
      <p><strong>Date:</strong> ${transport.date}</p>
      <p><strong>Time:</strong> ${transport.time}</p>
      <p><strong>Number of Pets:</strong> ${transport.count}</p>
      <p>has been ${status.toLowerCase()} by the vehicle manager.</p>
      <p>Thank you for using our service!</p>
      <p>Best regards,</p>
      <p>The Happy Tails Team</p>
    `;

    const mailOptions = {
      from: "Happy Tails",
      to: transport.email,
      subject: `Booking ${status}`,
      html: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        res.send("Email sent successfully");
      }
    });
  }

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

const assignVehicle = asyncHandler(async (req, res) => {
  const selectedPlateNo = req.body.selectedPlateNo;
  const transport = await Transport.findOneAndUpdate(
    { plateNo: selectedPlateNo },
    { status: "assigned" },
    { new: true }
  );
  res.json(transport);
});

const getCount = asyncHandler(async (req, res) => {
  const pendingCount = await Transport.countDocuments({ status: "PENDING" });
  const acceptedCount = await Transport.countDocuments({ status: "ACCEPTED" });
  const rejectedCount = await Transport.countDocuments({ status: "REJECTED" });

  res.json({ pendingCount, acceptedCount, rejectedCount });
});

module.exports = {
  addTransport,
  readTransport,
  updateTransport,
  deleteTransport,
  assignVehicle,
  getCount,
};
