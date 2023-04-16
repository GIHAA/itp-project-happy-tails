const express = require('express');
const Joi = require('joi');
const pet = require('../models/petModel');
const{validateRegReqBody}=require('../validations/vetValidation')
const mongoose = require('mongoose')

const registerPet = ((req, res) => {

  validateRegReqBody(req)

  // Destructure the request body
  const { petName,species,breed,gender,age,size,color,petStatus} = req.body;

  // Create a new profile
  const newpet = new pet({

    petName,
    species,
    breed,
    gender,
    age,
    size,
    color,
    petStatus

  });

  // Save the profile to the database
  newpet.save()
    .then(() => {
      // Respond with success message
      res.status(201).json({ message: 'profile added' });
    })
    .catch((err) => {
      // Log the error
      console.log(err);
      // Respond with an error message
      res.status(500).json({ error: 'Failed to add profile'});
    });
});

// update pet profile
const profileUpdate = (async(req,res)=>{

  const { id } = req.params;
  const { petName,species,breed,gender,age,size,color,petStatus , owenerId} = req.body;
  const updatedProfileData = { petName,species,breed,gender,age,size,color,petStatus , owenerId};

  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid Profile ID' });
  }

  // Validate the request body
  if (!petName || !species || !breed || !gender || !age || !size || !color || !petStatus) {
      return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
      // Ensure the profile belongs to the user making the request
      const profile = await pet.findById(id);
      if (!profile) {
          return res.status(404).send({ error: 'Profile not found' });
      }

      // Update the profile
      await pet.findByIdAndUpdate(id, updatedProfileData);

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
  //validate profile id
  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    console.log(profileId)
      return res.status(400).json({
          error: 'Invalid Profile ID'
      });
  }

  try {
      profile = await pet.findById(profileId);
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
  try {
      //validate the id
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ error: 'Invalid profile ID' });
      }

      // Check if the profile exists
      const deletedProfile = await pet.findById(req.params.id);
      if (!deletedProfile) {
          return res.status(404).json({ error: 'profile not found' });
      }
      // Delete the profile
      await pet.findByIdAndRemove(req.params.id);

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


module.exports = { registerPet,profileUpdate,getProfile,deleteProfile,getallprofile}