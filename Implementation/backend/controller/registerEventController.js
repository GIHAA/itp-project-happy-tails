const express = require('express');
const registerEvent = require('../models/registerEventModel')

const Joi = require('joi');
const mongoose = require('mongoose')


const registerevent = ((req, res) => {

  
    // Destructure the request body
    const { eid,eventName,cusName,noOfTicket,total,email,phoneNumber} = req.body;
  
    // Create a new booking
    const regEvent = new registerEvent({
     eid,
     eventName,
     cusName,
     noOfTicket,
     total,
     email,
     phoneNumber
    
    });
  
    // Save the profile to the database
    regEvent.save()
      .then(() => {
        // Respond with success message
        res.status(201).json({ message: 'booking added' });
      })
      .catch((err) => {
        // Log the error
        console.log(err);
        // Respond with an error message
        res.status(500).json({ error: 'Failed to booked'});
      });
  });


  
//get all registers

const getallbooking =(async (req,res) => {
  try {

      // get all the registers
      const allbooking = await registerEvent.find();
      // return the registers
      res.status(200).json({ allbooking });

  } catch (err) {

      console.log(err);
      res.status(500).json({ error: 'Internal server error' });

  }
});

//delete booking
const deleteBooking = (async (req, res) => {
  try {
      //validate the id
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ error: 'Invalid booking ID' });
      }

      // Check if the booking exists
      const deleteBooking = await registerEvent.findById(req.params.id);
      if (!deleteBooking) {
          return res.status(404).json({ error: 'booking not found' });
      }
      // Delete the booking
      await registerEvent.findByIdAndRemove(req.params.id);

      return res.status(200).json({ message: 'booking deleted successfully', deleteBooking });
  } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
  }
});

//get one booking

const getBooking = (async(req,res)=>{

  const { bookId } = req.params;
  let book = null;
  
  //validate booking id
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    //console.log(bookId)
      return res.status(400).json({
          error: 'Invalid booking ID'
      });
  }

  try {
    book = await registerEvent.findById(bookId);
  } catch (err) {
      console.error(err);
      return res.status(500).json({
          error: 'Internal server error'
      });
  }
  // check if booking exists
  if (!book) {
      return res.status(404).json({
          error: 'booking not found'
      });
  }
  res.status(200).json({book})
})


// update booking
const editBooking = (async(req,res)=>{

  const { id } = req.params;
  const { eid,eventName,cusName,noOfTicket,total,email,phoneNumber} = req.body;
  const updatedBookData = { eid,eventName,cusName,noOfTicket,total,email,phoneNumber};

  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid booking ID' });
  }

  // Validate the request body
  if (!eid ||!eventName || !cusName || !noOfTicket || !total || !email || !phoneNumber ) {
      return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
      // Ensure the booking belongs to the event manager making the request
      const book = await registerEvent.findById(id);
      if (!book) {
          return res.status(404).send({ error: 'booking not found' });
      }

      // Update the booking
      await registerEvent.findByIdAndUpdate(id, updatedBookData);

      // Return success response
      res.status(200).send({ status: 'Booking updated' });
  } catch (err) {
      console.log(`error:${err}`);
      res.status(500).send({ error: 'Internal server error' });
  }
});
module.exports ={ registerevent, getallbooking,deleteBooking, getBooking, editBooking }
