
const asyncHandler = require('express-async-handler')
const Counter = require('../models/counterModel')

//add count
const addCount = asyncHandler(async (req, res) => {
  
  try {
    const counter = await Counter.findOne().sort({ count: -1 }).exec();
    const highestCount = counter ? counter.count : 0;
    const newCounter = new Counter({ count: highestCount + 1 });
    const savedCounter = await newCounter.save();
    res.json({ count: savedCounter.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = {
    addCount,
  }
  
