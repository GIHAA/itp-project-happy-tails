const mongoose = require('mongoose')

const itemSchema  = mongoose.Schema(
    {
        item_name: {
            type: String,
            required: [true, 'Please add an item name'],
        },

        description: {
            type: String,
            required: [true, 'Please add an item description'],
        },

        qty: {
            type: Number,
            required: [true, 'Please add an item quantity'],
        },

        category: {
            type: String,
            enum: ['FOOD', 'MEDICINE', 'TOYS', 'BATHROOM-ESSENCIALS', 'GROOMING-EQUIPMENTS'],
            default : 'FOOD',
            required: [true, 'Please select an item category']
        },

    },
    {
        timestamps: true,
    }

)


module.exports = mongoose.model('Item', itemSchema)