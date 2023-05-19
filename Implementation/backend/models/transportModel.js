const mongoose = require("mongoose");

const transportSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [false, "Please add a customerId"],
      default: "temp userName",
    },

    plocation: {
      type: String,
      required: [false, "Please enter address"],
    },

    date: {
      type: String,
      required: [false, "Please add a date"],
    },

    time: {
      type: String,
      required: [false, "Please add a time"],
    },

    count: {
      type: Number,
      required: [false, "Please add no of pets"],
    },

    email: {
      type: String,
      required: [true, "Please add a gmail"],
    },

    phone: {
      type: String,
      required: [false, "Please add a phone number"],
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Transport", transportSchema);
