const asyncHandler = require('express-async-handler');
const Item = require('../models/inventoryModel');


//post - add item
const addItem = asyncHandler(async (req, res) => {

    const { item_name, description , qty, category } = req.body;

    const item = await Item.create({
        item_name,
        description,
        qty,
        category
    });

    item ? res.status(201).json(item) : res.status(400).json({ message : 'Failed to add item'});

});


//get - read all items 
const readAllItems = asyncHandler(async (req, res) => {

    const allItems = await Item.find({});

    res.status(200).json(allItems);

});



//put - update
const updateItem = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const { item_name, description, qty, category } = req.body;

    const item = await Item.findByIdAndUpdate(id, {
        item_name,
        description,
        qty,
        category
    });

    item ? res.status(201).json(item) : res.status(400).json({ message : 'item not updated'});

});



//delete
const deleteItem = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const item = await Item.findByIdAndDelete(id);

    item ? res.status(200).json(item) : res.status(400).json({ message : 'item not deleted' });

})



module.exports = {
    addItem,
    readAllItems,
    updateItem,
    deleteItem

}