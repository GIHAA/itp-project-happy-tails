const asyncHandler = require('express-async-handler');
const stockRelease = require('../models/stockReleaseModel');
const moment = require('moment');


//post - create stock release
const addRelease = asyncHandler(async (req, res) => {

    const { item_code, item_name, item_brand, category, qty, newQty } = req.body;
    const now = moment();
    const formatted = now.format('YYYY-MM-DD, h:mm a'); // Returns a formatted date string like "2023-10-10, 4:28 pm"


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
        date : formatted,
        item_code,
        item_name,
        item_brand,
        category,
        releaseQty : newQty,
        
    });

    stockrelease ? res.status(201).json(stockrelease) : res.status(400).json({ message : 'Stock release failed'});

});


//get - read all items 
const readAllReleases = asyncHandler(async (req, res) => {

    const stockrelease = await stockRelease.find({});

    res.status(200).json(stockrelease);

});


//get - group items by category and get sum of quantity
// const groupByCategory = asyncHandler(async (req, res) => {

//     const result = await stockRelease.aggregate([
//         { $group: { _id: "$category", total_quantity: { $sum: "$releaseQty" } } }
//     ]);

//     res.status(200).json(result);

// });

//process stock out data
const groupByCategory = async (req, res) => {

    try {
        const now = moment();
        const formatted = now.format('YYYY-MM'); // Returns current year and month as a string like "2023-04"

      const stockReleases = await stockRelease.aggregate([
        {
          $match: {
            date: { $regex: formatted } // filter documents based on month values in date field
          }
        },
        {
          $group: {
            _id: "$category",
            total_released_qty: { $sum: "$releaseQty" }
          }
        }
      ]);

        res.status(200).json(stockReleases);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
  };
  





module.exports = {
    addRelease,
    readAllReleases,
    groupByCategory

}