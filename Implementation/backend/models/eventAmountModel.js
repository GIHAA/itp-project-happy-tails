const mongoose = require('mongoose')

const eventAmountSchema  = mongoose.Schema(
  {
    eid: {
      type: Number,
      required: true
    },
    eventName: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      noOfTicket: {
        type: Number,
        required: true
      },
      totalIncome: {
        type: Number,
        required: true
      },
      totalExpense: {
        type: Number,
        required: true
      },
      result: {
        type: String,
        required: true
       
      },
      rate: {
        type: Number,
        required: true
      }

  }
)

module.exports = mongoose.model('eventAmount', eventAmountSchema)