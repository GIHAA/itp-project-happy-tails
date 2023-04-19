const express = require('express');
const budget = require('../models/budgetRequestModel')
const Joi = require('joi');
const mongoose = require('mongoose')



//add budget request
const reqBudget = ((req, res) => {

  
    // Destructure the request body
    const { eid,budgetid,eventName, items,description,total,status,amountStatus } = req.body;

    // Create a new event
    const newBudget = new budget({
        eid,
        budgetid,
        eventName,
        items,
        description,
        total,
        status,
        amountStatus
    });
  
    // Save the budget request to the database
    newBudget.save()
     .then(() => {
        // Respond with success message
        res.status(201).json({ message: 'Budget request added' });
      })
      .catch((err) => {
        // Log the error
        console.log(err);
        // Respond with an error message
        res.status(500).json({ error: 'Failed to add budget request'});
      });
  });


//get all budget request
const getBudgets=(async (req,res) => {
    try {
        // get all the budget request
        const allbudget= await budget.find();
    
        // return the feedbacks
        res.status(200).json({ allbudget });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
  });


  
//delete budget request
const deletebudget = (async (req, res) => {
  try {
      //validate the id
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ error: 'Invalid budget request ID' });
      }

      // Check if the budget request exists
      const deletebudget = await budget.findById(req.params.id);
      if (!deletebudget) {
          return res.status(404).json({ error: 'budget request not found' });
      }
      // Delete the budget request
      await budget.findByIdAndRemove(req.params.id);

      return res.status(200).json({ message: 'budget request deleted successfully', deletebudget });
  } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
  }
});


//get one budget

const getbudget = (async(req,res)=>{

  const { id } = req.params;
  let bud = null;
  //validate budget request id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(id)
      return res.status(400).json({
          error: 'Invalid budget request ID'
      });
  }

  try {
      bud = await budget.findById(id);
  } catch (err) {
      console.error(err);
      return res.status(500).json({
          error: 'Internal server error'
      });
  }
  // check if budget request exists
  if (!bud) {
      return res.status(404).json({
          error: 'budget request not found'
      });
  }
  res.status(200).json({bud})
})


// update budget request
const editbudget = (async(req,res)=>{

  const { id } = req.params;
  const { eid,eventName, items,description,total,status,amountStatus} = req.body;
  const updatedBudgetData = { eid,eventName, items,description,total,status,amountStatus};

  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid budget request ID' });
  }

  // Validate the request body
  if (!eid || !eventName || !items || !description || !total ||  !status || !amountStatus) {
      return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
      // Ensure the budget request belongs to the event manager making the request
      const bud = await budget.findById(id);
      if (!bud) {
          return res.status(404).send({ error: 'budget request not found' });
      }

      // Update the budget request
      await budget.findByIdAndUpdate(id, updatedBudgetData);

      // Return success response
      res.status(200).send({ status: 'Budget request updated' });
  } catch (err) {
      console.log(`error:${err}`);
      res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = { reqBudget,getBudgets,deletebudget,getbudget,editbudget}