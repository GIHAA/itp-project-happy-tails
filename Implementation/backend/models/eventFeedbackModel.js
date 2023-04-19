const mongoose = require('mongoose')

const efeefbackSchema = mongoose.Schema(
  {
    eid: {
        type: String,
        required: true
    },
    feedbackid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: [true, 'Please add your name'],
    },
    name: {
        type: String,
        required: [true, 'Please add your name'],
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add your phone number'],
    },
    feedbackType: {
        type: String,
        required: [true, 'Please select the feedback type'],
    },
    priceStatisfy: {
        type: Number,
        required: [true, 'Please add your statisfaction about the price rate'],
    },
    funStatisfy: {
        type: Number,
        required: [true, 'Please add your statisfaction about the entertainment rate'],
    },
    description:{
        type:String,
        required: [true, 'Please add your description'],

    },
    rating:{
        type:Number,
        required: [true, 'Please select your rating'],

    },
    newIdea:{
        type:String,
        required: [true, 'Please add your new thoughts'],
    }

  }
)

module.exports = mongoose.model('efeedback', efeefbackSchema)