const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
  {
    plateNo: {
      type: String,
      required: [true, "Please add an vehicle plate number"],
      unique: true,
    },

<<<<<<< HEAD
=======
    driverId: {
      type: String,
      required: [true, "Please add an driver id"],
    },

    agentId: {
      type: String,
      required: [true, "Please add an agent id"],
    },
>>>>>>> 735415bdc6eb34bc6e06195684fd1681ae098d8a

    vModel: {
      type: String,
      required: [true, "Please add an model of vehicle"],
    },

    insuranceExpirationDate: {
      type: String,
      required: [true, "Please add Insurance Expiration date "],
    },
<<<<<<< HEAD


    status: {
      type: String,
      enum: ['AVAILABLE', 'UNAVAILABLE'],
      default: 'AVAILABLE',
      required: [true, 'Please add a status'],
    },

    
 
=======
>>>>>>> 735415bdc6eb34bc6e06195684fd1681ae098d8a
  },

  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
