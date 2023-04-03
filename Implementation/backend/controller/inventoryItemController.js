const asyncHandler = require('express-async-handler');
const InventoryItem = require('../models/inventoryItemModel');


//post - add item
const addItem = asyncHandler(async (req, res) => {

    const { item_code, item_name, item_brand, category } = req.body;

    //check whether all values exists
    if (!item_code || !item_name || !item_brand || !category ) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if item already exists
    const itemExists = await InventoryItem.findOne({ item_code })

    if (itemExists) {
        res.status(409)
        throw new Error('Item already exists')
        
    }

    //create item
    const inventoryItem = await InventoryItem.create({
        item_code,
        item_name,
        item_brand,
        category,
        
    });

    inventoryItem ? res.status(201).json(inventoryItem) : res.status(400).json({ message : 'Failed to add item'});

});


//get - read all items 
const readAllItems = asyncHandler(async (req, res) => {

    const inventoryItem = await InventoryItem.find({});

    res.status(200).json(inventoryItem);

});





//put - update
const updateItem = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const { item_code, item_name, item_brand, category, qty } = req.body;

    //check whether all values exists
    if (!item_code || !item_name || !item_brand || !category || !qty) {
        res.status(400)
        throw new Error('Please add all fields')
    }


    const inventoryItem = await InventoryItem.findByIdAndUpdate(id, {
        item_code,
        item_name,
        item_brand,
        category,
        qty
    });

    inventoryItem ? res.status(201).json(inventoryItem) : res.status(400).json({ message : 'item not updated'});

});



//delete
const deleteItem = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const inventoryItem = await InventoryItem.findByIdAndDelete(id);

    inventoryItem ? res.status(200).json(inventoryItem) : res.status(400).json({ message : 'item not deleted' });

})



//get one item
const getOneItem = (async(req,res)=>{

    const { id } = req.params;
  
    let item = null;
  
    try {
        item = await InventoryItem.findOne({_id : id});
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }

    // check if item exists
    if (!item) {
        return res.status(404).json({
            error: 'item not found'
        });
    }
    res.status(200).json({item})
  })




module.exports = {
    addItem,
    readAllItems,
    getOneItem,
    updateItem,
    deleteItem

}