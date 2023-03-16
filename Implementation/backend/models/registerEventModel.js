
const mongoose = require('mongoose')

const registerEventSchema = mongoose.Schema(
  {
    cusName: {
        type: String,
        required: [true, 'Please add a name'],
    },
    noOfTicket: {
        type: String,
        required: [true, 'Please add number of tickets'],
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
    },
  
    phoneNumber:{
        type:String,
        required: [true, 'Please add a phone number'],

    },
    cardNumber:{
        type:String,
        required: [true, 'Please add a card number'],

    },
    cvv:{
        type:String,
        required: [true, 'Please add cvv of card'],
    },

    validDate:{
        type:String,
        required: [true, 'Please add valid date of card'],
    }

  }
)

module.exports = mongoose.model('registerEvent', registerEventSchema)






