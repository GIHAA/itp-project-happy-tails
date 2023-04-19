const mongoose = require('mongoose')

const ReqpaymentSchema = mongoose.Schema(
  {
    req_title: {
      type: String,
      required: [true, 'Please add a cus_id'],

    },

    plateNo: {
      type: String,
      required: [true, 'Please add a cus_id'],

    },

    date: {
      type: String,
      required: [true, 'Please add a date'],

    },
    payment: {
      type: Number,
      required: [true, 'Please add a payment'],
    },

    status: {
      type: String,
      enum: ['Accepted', 'Requested', 'PAID', 'FINISHED'],
      default: 'PAID',
      required: [true, 'Please add a status'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('VehReqPayment', ReqpaymentSchema)