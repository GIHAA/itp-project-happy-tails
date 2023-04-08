const asyncHandler = require('express-async-handler');
const stockRelease = require('../models/stockReleaseModel');

//post - create stock release
const addRelease = asyncHandler(async (req, res) => {

    const { item_code, item_name, item_brand, category, qty, newQty } = req.body;

    const qty1 = qty.toString()

    //check whether all values exists
    if (!item_code || !item_name || !item_brand || !category || !qty1 ) {
        res.status(400)
        throw new Error('missing field values')
    }

    // //check whether qty is greater than 0
    // const quantity = parseInt(qty);
    // if (quantity <= 0) {
    //     // res.status(400)
    //     // throw new Error('cannot release, item is out of stock');
    //     res.status(400).json({ message : 'cannot release, item is out of stock'})
    // }


    //create item
    const stockrelease = await stockRelease.create({
        item_code,
        item_name,
        item_brand,
        category,
        releaseQty : newQty,
        
    });

    stockrelease ? res.status(201).json(stockrelease) : res.status(400).json({ message : 'Stock release failed'});

});










module.exports = {
    addRelease,


}