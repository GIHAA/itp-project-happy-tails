const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER', 'EVENT_MANAGER' , 'INVENTORY_MANAGER' , 'VEHICLE_MANAGER' , 'ANIMAL_MANAGER' , 'FINANCIAL_MANAGER' , 'SUPPLIER_MANAGER'],
      default: 'USER',
      required: [true, 'Please add a role'],
    },
    image : {
      type : String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
