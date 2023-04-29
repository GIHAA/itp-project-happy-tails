const mongoose = require("mongoose");

const registerEventSchema = mongoose.Schema({
  eid: {
    type: String,
    required: true,
  },
  bookid: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: [true, "Please add a name"],
  },
  cusName: {
    type: String,
    required: [true, "Please add a name"],
  },
  noOfTicket: {
    type: Number,
    required: [true, "Please add number of tickets"],
  },
  total: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
  },

  phoneNumber: {
    type: String,
    required: [true, "Please add a phone number"],
  },
});

module.exports = mongoose.model("registerEvent", registerEventSchema);
