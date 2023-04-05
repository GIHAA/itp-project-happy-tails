const asyncHandler = require('express-async-handler');
const InventoryItem = require('../models/inventoryItemModel');


//post - add item
const addItem = asyncHandler(async (req, res) => {

    const { item_code, item_name, item_brand, category, qty } = req.body;

    const inventoryItem = await InventoryItem.create({
        item_code,
        item_name,
        item_brand,
        category,
        qty
        
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



module.exports = {
    addItem,
    readAllItems,
    updateItem,
    deleteItem

}