const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a cus_id"],
    },
    message: {
      type: String,
      required: [false],
      default : "no reply"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedback", feedbackSchema);
