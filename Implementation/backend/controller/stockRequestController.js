const asyncHandler = require("express-async-handler");
const StockRequest = require("../models/stockRequestModel");
const moment = require("moment");

//post - create stock request
const requestStock = asyncHandler(async (req, res) => {
  const { item_code, item_name, item_brand, category, qty, status } = req.body;
  const now = moment();
  const formatted = now.format("YYYY-MM-DD, h:mm a"); // Returns a formatted date string like "2023-10-10, 4:28 pm"

  //check whether all values exists
  if (!item_code || !item_name || !item_brand || !category || !qty) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check whether qty is greater than 0
  const quantity = parseInt(qty);
  if (quantity <= 0) {
    res.status(400);
    throw new Error("qty must be greater than 0");
  }

  //create item
  const stockRequest = await StockRequest.create({
    date: formatted,
    item_code,
    item_name,
    item_brand,
    category,
    qty,
    total: 0,
    status,
  });

  stockRequest
    ? res.status(201).json(stockRequest)
    : res.status(400).json({ message: "Stock request failed" });
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

    const now = moment();
    const formatted = now.format("YYYY-MM-DD, h:mm a");

    // Find the record by ID and update the specified field
    const record = await StockRequest.findByIdAndUpdate(id, updatedField, {
      new: true,
    });

    // Send the updated record as the response
    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//process stock in data
const groupByCategory = async (req, res) => {
  try {
    const now = moment();
    const formatted = now.format("YYYY-MM"); // Returns current year and month as a string like "2023-04"

    const stockReceived = await StockRequest.aggregate([
      {
        $match: {
          rec_date: { $regex: formatted },
          status: { $regex: "received" }, // filter documents based on month values in date field
        },
      },
      {
        $group: {
          _id: "$category",
          total_received_qty: { $sum: "$qty" },
        },
      },
    ]);

    res.status(200).json(stockReceived);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  requestStock,
  getAllRequests,
  updateRequestField,
  groupByCategory,
};
