const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    description: {
        type: String,
        required: [true, 'Please add event description'],
    },
    startTime: {
        type: String,
        required: [true, 'Please add event start time'],
    },
  
    endTime:{
        type:String,
        required: [true, 'Please add event end time'],

    },
    date:{
        type:String,
        required: [true, 'Please add event date'],

    },
    venue:{
        type:String,
        required: [true, 'Please add event venue'],
    },

    price:{
        type:String,
        required: [true, 'Please add event ticket price'],
    },
    manager:{
        type:String,
        required: [true, 'Please add event manager name'],
    }

  }
)

module.exports = mongoose.model('event', eventSchema)