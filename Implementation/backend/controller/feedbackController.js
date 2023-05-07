const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Feedback = require('../models/feedbackModel')


const viewFeedback = asyncHandler(async (req, res) => {
    const feedback = await Feedback.find({})

    feedback? res.status(201).json(feedback) : res.status(400).json({message : "Error"})
})

const addFeedback = asyncHandler(async (req, res) => {
    const { name , email , message } = req.body

    const feedback = await Feedback.create({
        name,
        email,
        message,
    })
    feedback? res.status(201).json(feedback) : res.status(400).json({message : "Error"})
})

const updateFeedback = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name , email , message } = req.body
  
    // Wait for the Feedback model to find the document by ID
    const feedback = await Feedback.findOne({ _id: id });
  
    if (feedback) {
      // Update the feedback document with new values
      feedback.name = name || feedback.name;
      feedback.email = email || feedback.email;
      feedback.message = message || feedback.message;
  
      // Save the updated document and wait for it to complete
      await feedback.save();
  
      res.status(201).json(feedback);
    } else {
      res.status(400).json({ message: "Error" });
    }
  });
  


const deleteFeedback = asyncHandler(async (req, res) => {

    const id = req.params.id
    const feedback = await Feedback.findByIdAndDelete(id)

    feedback? res.status(201).json(feedback) : res.status(400).json({message : "Error"})
});
  

module.exports = {
  viewFeedback,
  addFeedback,
  updateFeedback,
  deleteFeedback
}
