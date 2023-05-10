const mongoose = require("mongoose");

const transportSchema = mongoose.Schema(
  {

    userName: {
        type: String,
        required: [true, 'Please add a customerId'],
        default: 'temp userName',
    },

    plocation: {
      type: String,
      required: [true, "Please enter address"],
    },


    date: {
      type: String,
      required: [true, "Please add a date"],
    },

    time: {
      type: String,
      required: [true, "Please add a time"],
    },


    count: {
        type: Number,
        required: [true, 'Please add no of pets'],
    },

    email: {
      type: String,
      required: [true, 'Please add a gmail'],
    },


    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },


    

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transport", transportSchema);
