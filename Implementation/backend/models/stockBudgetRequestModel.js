const mongoose = require('mongoose')

const stockBudgetRequestSchema  = mongoose.Schema(
  {
      supplier_name: {
      type: String,
      },
      supplier_ID: {
        type: String,
        },
      item_name: {
        type: String,
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
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      amountStatus: {
        type: String,
        required: true
      }

  }
)

module.exports = mongoose.model('stockBudget', stockBudgetRequestSchema)