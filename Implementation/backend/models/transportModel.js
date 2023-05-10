const mongoose = require("mongoose");

const transportSchema = mongoose.Schema(
  {

    userName: {
        type: String,
        required: [false, 'Please add a customerId'],
        default: 'temp userName',
    },

    plocation: {
      type: String,
      required: [false, "Please enter address"],
    },

<<<<<<< HEAD
=======
    dlocation: {
      type: String,
      required: [false, "Please enter address"],
    },

    petType: {
      type: String,
      required: [false, "Please add type of pet"],
    },
>>>>>>> e81165080bf94b7aa9195a0e632c305649a34b23

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
        required: [false, 'Please add no of pets'],
    },

    email: {
      type: String,
      required: [true, 'Please add a gmail'],
    },
<<<<<<< HEAD


=======
    phone: {
      type: String,
      required: [false, "Please add a phone number"],
    },
>>>>>>> e81165080bf94b7aa9195a0e632c305649a34b23
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
