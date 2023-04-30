const mongoose = require("mongoose");

const userPets = mongoose.Schema(
  {
    cus_id: {
      type: String,
      required: [true, "Please add a cus_id"],
    },
    pet_id: {
        type: String,
        required: [true, "Please add a pet_id"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userpets", userPets);
