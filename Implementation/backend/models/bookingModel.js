const mongoose = require("mongoose");

const miniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["cat", "dog", "other"],
    required: true,
  },
});

const bookingSchema = new mongoose.Schema({
  cus_id: {
    type: String,
    required: [true, "Please add a cus_id"],
    default: "temp cus_id",
  },
  contactNumbers: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  mini: {
    type: [miniSchema],
    required: true,
  },
  status: {
    type: String,
    enum: ['BOOKED', 'CANCLED', 'PAID' , 'FINISHED'],
    default: 'BOOKED',
    required: [true, 'Please add a status'],
  },
});

const FormData = mongoose.model("Booking", bookingSchema);

module.exports = FormData;
