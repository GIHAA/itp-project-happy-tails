const mongoose = require("mongoose");

const stockBudgetRequestSchema  = mongoose.Schema(
  {
      supplier_name: {
      type: String,
      required: true
      },
      item_name: {
        type: String,
        required: true
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
      description: {
        type: String,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ['Accepted', 'Requested', 'Pending', 'FINISHED'],
        default: "Pending",
        required: true
      }
    });
module.exports = mongoose.model("stockBudget", stockBudgetRequestSchema);
