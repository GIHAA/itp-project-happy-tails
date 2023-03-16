const mongoose = require('mongoose')

const transportSchema = mongoose.Schema(
  {

    customerId: {
        type: String,
        required: [true, 'Please add a customerId'],
        default: 'temp customerId',
    },
    

    plocation: {
        type: String,
        required: [true, 'Please enter address'],
    },

    dlocation: {
      type: String,
      required: [true, 'Please enter address'],
    },

    petType: {
        type: String,
        required: [true, 'Please add type of pet'],
    },

    petGender: {
      type: String,
      required: [true, 'Please add gender of pet'],
    },

    date: {
        type: String,
        required: [true, 'Please add a date'],
    },

    time: {
        type: String,
        required: [true, 'Please add a time'],
    },


    vaccineStatus: {
      type: String,
      enum: ['VACCINATED', 'NOT_VACCINATED'],
      required: [false, 'Please specify vaccine details']
    },


    count: {
        type: Number,
        required: [true, 'Please add no of pets'],
    },

      
    status: {
        type: String,
        enum: ['PENDING', 'CANCLED', 'ACCEPTED' , 'REJECTED'],//?
        default: 'PENDING',//?
        required: [false, 'Please add a status'],
      },


    


 
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Transport', transportSchema)
