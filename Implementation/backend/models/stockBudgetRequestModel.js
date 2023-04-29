const mongoose = require("mongoose");

<<<<<<< HEAD
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
=======
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
>>>>>>> b11d283dbe1680def8ce497d049077edf29d482f

module.exports = mongoose.model("stockBudget", stockBudgetRequestSchema);
