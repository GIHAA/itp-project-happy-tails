const mongoose = require('mongoose')

const petSchema = mongoose.Schema(
  {
    petName: {
        type: String,
        required: [true, 'Please add a name'],
    },
    petId:{
        type: String,
        required: [true, 'Please add a petid'],
    },
    species: {
        type: String,
        required: [true, 'Please add an species'],
    },
    breed: {
        type: String,
        required: [true, 'Please add a breed'],
    },
  
    gender:{
        type:String,
        required: [true, 'Please add a gender'],

    },
    birth:{
        type:String,
        required: [true, 'Please add a Age'],

    },
    weight:{
        type:String,
        required: [true, 'Please add a weight'],
    },

    color:{
        type:String,
        required: [true, 'Please add a color'],
    },
     
    date:{
        type:String,
        required: [true, 'Please add check in date'],
    },

    petStatus:{
        type:String,
        required: [true, 'Please add a status'],
    },

    qrCode: { type: String, required: true },

    image:{ type:String,required:true},

    price:{
        type:String,
        required: [true, 'Please add a price'],
    },

    systime:{

        type:String,
        required: [true, 'sys time'],

    }

  }
)

module.exports = mongoose.model('pet', petSchema)
