const express = require("express");
const efeedback = require("../models/eventFeedbackModel");
const Joi = require("joi");
const mongoose = require("mongoose");

//add feedback
const addFeedback = (req, res) => {
  // Destructure the request body
  const {
    eid,
    feedbackid,
    eventName,
    name,
    email,
    phoneNumber,
    feedbackType,
    priceStatisfy,
    funStatisfy,
    description,
    rating,
    newIdea,
  } = req.body;

  // Create a new event
  const newefeedback = new efeedback({
    eid,
    feedbackid,
    eventName,
    name,
    email,
    phoneNumber,
    feedbackType,
    description,
    rating,
    priceStatisfy,
    funStatisfy,
    newIdea,
  });

  // Save the feedback to the database
  newefeedback
    .save()
    .then(() => {
      // Respond with success message
      res.status(201).json({ message: "Feedback added" });
    })
    .catch((err) => {
      // Log the error
      console.log(err);
      // Respond with an error message
      res.status(500).json({ error: "Failed to add feedback" });
    });
};

//get all feedbacks
const getEFeedbacks = async (req, res) => {
  try {
    // get all the feedbacks
    const allfeedbacks = await efeedback.find();
    // return the feedbacks
    res.status(200).json({ allfeedbacks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete feedback
const deleteFeedback = async (req, res) => {
  try {
    //validate the id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid feedback ID" });
    }

    // Check if the feedback exists
    const deleteFeedback = await efeedback.findById(req.params.id);
    if (!deleteFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    // Delete the feedback
    await efeedback.findByIdAndRemove(req.params.id);

    return res
      .status(200)
      .json({ message: "feedback deleted successfully", deleteFeedback });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { addFeedback, getEFeedbacks, deleteFeedback };
