const mongoose = require('mongoose')

const supplierSchema = mongoose.Schema(
  {
  
    name: {
        type: String,
        required: [true, 'Please add  name'],
    },
  
    phone: {
    type: Number,
    required: [true, 'Please add a phone number'],
      },

    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
   
    address: {
      type: String,
      required: [true, 'Please add your address'],
    },
    type: {
      type: String,
      required: [true, 'Please select a type'],
    }
   
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Supplier', supplierSchema)
