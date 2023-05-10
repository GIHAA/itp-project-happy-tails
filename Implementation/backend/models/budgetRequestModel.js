const mongoose = require("mongoose");

const budgetRequestSchema = mongoose.Schema({
  eid: {
    type: String,
    required: true,
  },
  budgetid: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  items: [
    {
      product: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  amountStatus: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("budget", budgetRequestSchema);
