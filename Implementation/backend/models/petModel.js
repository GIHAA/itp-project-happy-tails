const mongoose = require('mongoose')

const petSchema = mongoose.Schema(
  {
    petName: {
        type: String,
        required: [true, 'Please add a name'],
    },
    owenerId: {
        type: String,
        required: false,
    },
    species: {
        type: String,
        required: [true, 'Please add an email'],
    },
    breed: {
        type: String,
        required: [true, 'Please add a password'],
    },
  
    gender:{
        type:String,
        required: [true, 'Please add a gender'],

    },
    age:{
        type:String,
        required: [true, 'Please add a Age'],

    },
    size:{
        type:String,
        required: [true, 'Please add a size'],
    },

    color:{
        type:String,
        required: [true, 'Please add a color'],
    },
     
    petStatus:{
        type:String,
        required: [true, 'Please add a status'],
        enum: ['Available', 'paid', 'Booked'],
    }

  }
)

module.exports = mongoose.model('pet', petSchema)
