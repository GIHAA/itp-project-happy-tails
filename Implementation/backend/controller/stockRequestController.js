const asyncHandler = require('express-async-handler');
const StockRequest = require('../models/stockRequestModel');


//post - create stock request
const requestStock = asyncHandler(async (req, res) => {

    const { item_code, item_name, item_brand, category, qty, status } = req.body;

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
        qty,
        status
        
    });

    stockRequest ? res.status(201).json(stockRequest) : res.status(400).json({ message : 'Stock request failed'});

});




//get - read all stock requests 
const getAllRequests = asyncHandler(async (req, res) => {

    const stockRequest = await StockRequest.find({});

    res.status(200).json(stockRequest);

});


//update accepted to received
const updateRequestField = asyncHandler(async (req, res) => {

    try {
        const id = req.params.id;
        const updatedField = req.body;
    
        // Find the record by ID and update the specified field
        const record = await StockRequest.findByIdAndUpdate(id, updatedField, { new: true });
    
        // Send the updated record as the response
        res.json(record);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }

});







module.exports = { 
    requestStock ,
    getAllRequests,
    updateRequestField,
}