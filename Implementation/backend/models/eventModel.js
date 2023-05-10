const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  eid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  description: {
    type: String,
    required: [true, "Please add event description"],
  },
  startTime: {
    type: String,
    required: [true, "Please add event start time"],
  },

  endTime: {
    type: String,
    required: [true, "Please add event end time"],
  },
  date: {
    type: String,
    required: [true, "Please add event date"],
  },
  venue: {
    type: String,
    required: [true, "Please add event venue"],
  },

  price: {
    type: Number,
    required: [true, "Please add event ticket price"],
  },
  status: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  size: {
    type: String,
    required: [true, "Please add event participant size"],
  },
});

module.exports = mongoose.model("event", eventSchema);
