const asyncHandler = require('express-async-handler');
const StockRequest = require('../models/stockRequestModel');


//post - create stock request
const requestStock = asyncHandler(async (req, res) => {

    const { item_code, item_name, item_brand, category, qty } = req.body;

    //check whether all values exists
    if (!item_code || !item_name || !item_brand || !category || !qty ) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check whether qty is greater than 0
    const quantity = parseInt(qty);
    if (quantity <= 0) {
        res.status(400)
        throw new Error('qty must be greater than 0');
    }


    //create item
    const stockRequest = await StockRequest.create({
        item_code,
        item_name,
        item_brand,
        category,
        qty
        
    });

    stockRequest ? res.status(201).json(stockRequest) : res.status(400).json({ message : 'Stock request failed'});

});




//get - read all stock requests 
const getAllRequests = asyncHandler(async (req, res) => {

    const stockRequest = await StockRequest.find({});

    res.status(200).json(stockRequest);

});


module.exports = { 
    requestStock ,
    getAllRequests
}