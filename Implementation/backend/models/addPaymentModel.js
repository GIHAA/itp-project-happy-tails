const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema(
  {
    cus_id: {
      type: String,
      required: [false, 'Please add a cus_id'],
     
    },
    pet_id: {
      type: String,
      required: [true, 'Please add a pet_id'],
    
    },
    payment: {
      type: Number,
      required: [true, 'Please add a payment'],
    },

    status: {
      type: String,
      enum: ['Verified', 'CANCELED', 'PAID', 'FINISHED'],
      default: 'PAID',
      required: [true, 'Please add a status'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Payment', paymentSchema)