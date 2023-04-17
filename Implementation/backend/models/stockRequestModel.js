const mongoose = require('mongoose')

const stockRequestSchema  = mongoose.Schema(
    {

        item_code: {
            type: String,
            required: [true, 'Please add an item ID'],
            
        }, 

        item_name: {
            type: String,
            required: [true, 'Please add an item name'],
        },

        item_brand: {
            type: String,
            required: [true, 'Please add an item brand'],
        },

        category: {
            type: String,
            lowercase: true,
            default : 'FOOD',
            required: [true, 'Please select an item category']
        },

        qty: {
            type: Number,
            min: 1,
            default: 1,
        },

        status: {
            type: String,
            //enum: ['PENDING', 'ACCEPTED', 'RECIEVED',],
            lowercase: true,
            default: 'PENDING',
            required: true,
          },

        

    },
    {
        timestamps: true,
    }

)


module.exports = mongoose.model('StockRequest', stockRequestSchema)