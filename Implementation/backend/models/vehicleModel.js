const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
  {
    plateNo: {
      type: String,
      required: [true, "Please add an vehicle plate number"],
      unique: true,
    },

    vModel: {
      type: String,
      required: [true, "Please add an model of vehicle"],
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "UNAVAILABLE"],
      default: "AVAILABLE",
    },

    insuranceExpirationDate: {
      type: String,
      required: [true, "Please add Insurance Expiration date "],
    },
  },

  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
