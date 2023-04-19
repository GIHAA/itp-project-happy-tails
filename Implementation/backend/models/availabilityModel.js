const mongoose = require('mongoose')

const availabilitySchema = mongoose.Schema(
  {
    
   
    plateNo: {
      type: String,
      required: [true, 'Please add an vehicle plate number'],
      unique: true,
   },

    reason: {
        type: String,
        required: [true, 'Please add an reason'],
    },

    since: {
        type: String,
        required: [true, 'Please add date'],
    },

    to: {
      type: String,
      required: [true, 'Please add date'],
    },

    status: {
      type: String,
      enum: ['AVAILABLE', 'UNAVAILABLE'],
      default: 'AVAILABLE',
      required: [true, 'Please add a status'],
    },

    
 
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Availability', availabilitySchema)
