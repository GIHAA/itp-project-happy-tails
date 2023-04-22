const mongoose = require("mongoose");

const stockBudgetRequestSchema = mongoose.Schema({
  supplier_name: {
    type: String,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
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
    default: "Pending",
  },
});

module.exports = mongoose.model("stockBudget", stockBudgetRequestSchema);
