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

module.exports = mongoose.model("counter", counterSchema);