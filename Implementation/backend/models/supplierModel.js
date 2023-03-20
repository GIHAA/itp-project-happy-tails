const mongoose = require('mongoose')

const supplierSchema = mongoose.Schema(
  {
  
    fname: {
        type: String,
        required: [true, 'Please add first name'],
    },
    lname: {
      type: String,
      required: [true, 'Please add last name'],
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
      enum: ['FOOD', 'MEDICINE', 'TOYS', 'CLEANING_PRODUCTS','OTHER'],
      required: [true, 'Please select a type'],
    }
   
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Supplier', supplierSchema)
