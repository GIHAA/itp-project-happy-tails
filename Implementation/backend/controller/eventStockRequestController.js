const express = require('express');
const stockr = require('../models/eventStockRequestModel')
const Joi = require('joi');
const mongoose = require('mongoose')


//add stock request
const reqstock = ((req, res) => {

  
    // Destructure the request body
    const { eid,stockid,eventName, items,description,status } = req.body;
  

    // Create a new stock request
    const newStock = new stockr({
        eid,
        stockid,
        eventName,
        items,
        description,
        status
    });
  
    // Save the stock request to the database
    newStock.save()
     .then(() => {
        // Respond with success message
        res.status(201).json({ message: 'Stock request added' });
      })
      .catch((err) => {
        // Log the error
        console.log(err);
        // Respond with an error message
        res.status(500).json({ error: 'Failed to add stock request'});
      });
  });


//get all stock request
const getStocks=(async (req,res) => {
    try {
        // get all the stock request
        const getstocks= await stockr.find();
        // return the stocks
        res.status(200).json({ getstocks });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
  });


  
//delete stock request
const deletestock = (async (req, res) => {
  try {

      //validate the id
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ error: 'Invalid stock request ID' });
      }

      // Check if the stock request exists
      const deletestock = await stockr.findById(req.params.id);
      if (!deletestock) {
          return res.status(404).json({ error: 'stock request not found' });
      }
      // Delete the stock request
      await stockr.findByIdAndRemove(req.params.id);

      return res.status(200).json({ message: 'stock request deleted successfully', deletebudget });
  } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
  }
});


//get one stock request

const getstock = (async(req,res)=>{

  const { id } = req.params;
  let stockreq = null;
  //validate stock request id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(id)
      return res.status(400).json({
          error: 'Invalid stock request ID'
      });
  }

  try {
    stockreq = await stockr.findById(id);
  } catch (err) {
      console.error(err);
      return res.status(500).json({
          error: 'Internal server error'
      });
  }
  // check if stock request exists
  if (!stockreq) {
      return res.status(404).json({
          error: 'stock request not found'
      });
  }
  res.status(200).json({stockreq})
})


// update stock request
const editstock = (async(req,res)=>{

  const { id } = req.params;
  const { eid,eventName, items,description,status} = req.body;
  const updatedStockData = { eid,eventName, items,description,status};

  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid stock request ID' });
  }

  // Validate the request body
  if (!eid ||!eventName || !items || !description || !status || !eid) {
      return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
      // Ensure the stock request belongs to the event manager making the request
      const stockreq = await stockr.findById(id);
      if (!stockreq) {
          return res.status(404).send({ error: 'stock request not found' });
      }

      // Update the stock request
      await stockr.findByIdAndUpdate(id, updatedStockData);

      // Return success response
      res.status(200).send({ status: 'Stock request updated' });
  } catch (err) {
      console.log(`error:${err}`);
      res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = { reqstock,getStocks,deletestock,getstock,editstock}