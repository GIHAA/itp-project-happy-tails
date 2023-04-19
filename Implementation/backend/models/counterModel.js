const mongoose = require("mongoose");

const counterSchema = mongoose.Schema(
  {
    count: {
      type: Number,
      required: [false],
    },
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
module.exports = mongoose.model("counter", counterSchema);
=======
module.exports = mongoose.model("counter", counterSchema);
>>>>>>> 08d9218f0558ac4c675122b0a82ca83f7303425b
