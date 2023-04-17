const express = require('express');
const registerEvent = require('../models/registerEventModel')

const Joi = require('joi');
const mongoose = require('mongoose')


const registerevent = ((req, res) => {

  
    // Destructure the request body
    const { cusName,noOfTicket,email,phoneNumber,cardNumber,cvv,validDate} = req.body;
  
    // Create a new booking
    const regEvent = new registerEvent({
  
     cusName,
     noOfTicket,
     email,
     phoneNumber,
     cardNumber,
     cvv,
     validDate
  
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
    console.log("hi")
      // get all the registers
      const allbooking = await registerEvent.find();
      // return the registers
      res.status(200).json({ allbooking });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports ={ registerevent, getallbooking }
