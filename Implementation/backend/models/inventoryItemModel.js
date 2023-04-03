const mongoose = require('mongoose')

const inventoryItemSchema  = mongoose.Schema(
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
            default : 'FOOD',
            required: [true, 'Please select an item category']
        },

        qty: {
            type: Number,
            default : 0,
        },

        

    },
    {
        timestamps: true,
    }

)


module.exports = mongoose.model('InventoryItem', inventoryItemSchema)