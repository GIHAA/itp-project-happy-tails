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
