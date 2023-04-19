<<<<<<< HEAD
const asyncHandler = require('express-async-handler')
const Counter = require('../models/counterModel')

//add count
const addCount = asyncHandler(async (req, res) => {
  console.log("called");
  
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
  
=======
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Counter = require('../models/counterModel')

const addCount = asyncHandler(async (req, res) => {
  try {
    const counter = await Counter.findOne().sort({ count: -1 }).exec();

    const highestCount = counter ? counter.count : 0;
    const newCounter = new Counter({ count: highestCount + 1 });
    const savedCounter = await newCounter.save();

    res.json({ count: savedCounter.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding count" });
  }
});

module.exports = {
  addCount,
}
>>>>>>> 08d9218f0558ac4c675122b0a82ca83f7303425b
