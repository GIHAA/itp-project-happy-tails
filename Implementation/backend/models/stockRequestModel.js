const mongoose = require('mongoose')

const stockRequestSchema  = mongoose.Schema(
    {
        date: {
            type: String,
            required: [true, 'Please add a date'],
            
        }, 

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

        total: {
            type: String,
            required: [true, 'Please enter total amount'],
        },

        status: {
            type: String,
            //enum: ['PENDING', 'ACCEPTED', 'RECIEVED',],
            lowercase: true,
            default: 'PENDING',
            required: true,
          },

          rec_date: {
            type: String,
            
        }, 

        

    },
    {
        timestamps: true,
    }

)


module.exports = mongoose.model('StockRequest', stockRequestSchema)