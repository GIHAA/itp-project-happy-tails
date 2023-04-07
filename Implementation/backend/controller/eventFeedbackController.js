const express = require('express');
const efeedback = require('../models/eventFeedbackModel')
const Joi = require('joi');
const mongoose = require('mongoose')
//const{validateFedReqBody}=require('../validations/eventFeedbackValidation')


//add feedback
const addFeedback = ((req, res) => {

   // validateFedReqBody(req)
  
    // Destructure the request body
    const { name,email,feedbackType,description,rating,newIdea} = req.body;
  
    // Create a new event
    const newefeedback = new efeedback({
  
        name,
        email,
        feedbackType,
        description,
        rating,
        newIdea
  
    });
  
    // Save the feedback to the database
    newefeedback.save()
      .then(() => {
        // Respond with success message
        res.status(201).json({ message: 'Feedback added' });
      })
      .catch((err) => {
        // Log the error
        console.log(err);
        // Respond with an error message
        res.status(500).json({ error: 'Failed to add feedback'});
      });
  });


//get all feedbacks
const getEFeedbacks=(async (req,res) => {
    try {
        // get all the feedbacks
        const allfeedbacks= await efeedback.find();
        // return the feedbacks
        res.status(200).json({ allfeedbacks });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports = { addFeedback,getEFeedbacks}