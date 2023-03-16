const express = require('express');
const Joi = require('joi');
const pet = require('../models/petModel');
const{validateRegReqBody}=require('../validations/vetValidation');
const mongoose = require('mongoose');
const moment = require('moment');
const QRCode = require('qrcode');

const registerPet = ((req, res) => {
  if(validateRegReqBody(req, res)) {
    const date = moment(req.body.date).startOf('day').format('YYYY-MM-DD');
    // Destructure the request body
    const { petName, petId, species, breed, gender, age, size, color, petStatus } = req.body;
    // Create a new profile
    const newpet = new pet({
      petName,
      petId,
      species,
      breed,
      gender,
      age,
      size,
      color,
      date,
      petStatus,
    });
    // Generate QR code
    QRCode.toDataURL(JSON.stringify(newpet), function (err, url) {
      if (err) {
        console.error(err);
        // Respond with an error message
        return res.status(500).json({ error: 'Failed to generate QR code' });
      }
      // Get the base64-encoded QR code image data from the URL
      const base64Image = url.split(',')[1];
      // Save the base64-encoded QR code to the database
      newpet.qrCode = base64Image;
      newpet.save()
        .then(() => {
          // Respond with success message and the new pet object
          res.status(201).json({ message: 'Profile added', pet: newpet });
        })
        .catch((err) => {
          // Log the error
          console.log(err);
          // Respond with an error message
          res.status(500).json({ error: 'Failed to add profile' });
        });
    });
  }
});



// update pet profile
const profileUpdate = (async(req,res)=>{
console.log("hi")
  const {id} = req.params;
  const { petName,species,breed,gender,age,date,size,color,petStatus} = req.body;
  const updatedProfileData = { petName,species,breed,gender,age,date,size,color,petStatus};

  // Validate the request body
  if (!petName || !species || !breed || !gender || !age ||!date || !size || !color || !petStatus) {
      return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
      // Ensure the profile belongs to the user making the request
      const profile = await pet.findOne({ petId: id });
  
      if (!profile) {
          return res.status(404).send({ error: 'Profile not found' });
      }

      // Update the profile
      await pet.findOneAndUpdate({ petId: id }, updatedProfileData);

      // Return success response
      res.status(200).send({ status: 'Profile updated' });
  } catch (err) {
      console.log(`error:${err}`);
      res.status(500).send({ error: 'Internal server error' });
  }
});

//get one pet profile

const getProfile = (async(req,res)=>{

  const { profileId } = req.params;

  let profile = null;

  try {
      profile = await pet.findOne({petId:profileId});
  } catch (err) {
      console.error(err);
      return res.status(500).json({
          error: 'Internal server error'
      });
  }
  // check if profile exists
  if (!profile) {
      return res.status(404).json({
          error: 'Profile not found'
      });
  }
  res.status(200).json({profile})
})

//delete profile
const deleteProfile = (async (req, res) => {

  const { id } = req.params;
  try {
      // Check if the profile exists
      const deletedProfile = await pet.findOne({petId:id});
      if (!deletedProfile) {
          return res.status(404).json({ error: 'profile not found' });
      }
      // Delete the profile
      await pet.findOneAndDelete({petId:id});

      return res.status(200).json({ message: 'profile deleted successfully', deletedProfile });
  } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
  }
});

//get all profiles

const getallprofile=(async (req,res) => {
  try {
      // get all the profile
      const profiles= await pet.find();
      // return the profile
      res.status(200).json({ profiles });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

const searchprofile = ( async (req, res) => {
  try {
    const query = req.query.petId;
    const profile = await pet.find({ petId: query });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const Qr =(async (req, res) => {

  const {id} = req.params;
  console.log(id)
  try {
    const petob = await pet.findOne({petId:id});
    console.log(petob);
    if (!petob || !petob.qrCode) {
      return res.status(404).json({ error: 'QR code not found' });
    }
    res.send(petob.qrCode);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get QR code' });
  }
});


module.exports = { registerPet,profileUpdate,getProfile,deleteProfile,getallprofile,searchprofile,Qr}