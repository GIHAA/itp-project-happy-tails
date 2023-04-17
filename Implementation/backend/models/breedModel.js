const mongoose = require('mongoose')

const breedSchema = mongoose.Schema(
  {
    breed: {
        type: String,
        required: [true, 'Please add a breed'],
    },

    species: {
        type: String,
        required: [true, 'Please add a breed'],
    },

    date: {
        type: String,
        required: [true, 'Please add a date'],
    }
    
  }
)

module.exports = mongoose.model('breed', breedSchema)
