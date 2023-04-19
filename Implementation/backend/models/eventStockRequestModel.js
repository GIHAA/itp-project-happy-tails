const mongoose = require('mongoose')

const stockRequestSchema  = mongoose.Schema(
  {
    eid: {
      type: String,
      required: true
   },
    stockid: {
    type: String,
    required: true
   },
    eventName: {
        type: String,
        required: true
      },
      items: [
        {
         product: { type: String, required: true },
          quantity: { type: Number, required: true }
        }
      ],
      submittedAt: {
        type: Date,
        default: Date.now,
      },
      description: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      }

  }
)

module.exports = mongoose.model('stockr', stockRequestSchema)