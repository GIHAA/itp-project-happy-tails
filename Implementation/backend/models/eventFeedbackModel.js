const mongoose = require('mongoose')

const efeefbackSchema = mongoose.Schema(
  {
    feedbackid: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'Please add your name'],
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
    },
    feedbackType: {
        type: String,
        required: [true, 'Please select the feedback type'],
    },
  
    description:{
        type:String,
        required: [true, 'Please add your description'],

    },
    rating:{
        type:String,
        required: [true, 'Please select your rating'],

    },
    newIdea:{
        type:String,
        required: [true, 'Please add your new thoughts'],
    }

  }
)

module.exports = mongoose.model('efeedback', efeefbackSchema)