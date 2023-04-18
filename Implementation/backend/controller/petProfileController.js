const express = require('express');
const Joi = require('joi');
const pet = require('../models/petModel');
const booking = require('../models/bookingModel');
const breed = require('../models/breedModel');
const mongoose = require('mongoose'); 
const QRCode = require('qrcode');

const registerPet = ((req, res) => {
  
   const { petName, pId, date, species, breed, gender, birth,  weight, color, petStatus,image,price } = req.body;
   
    const systime = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" })

    let petId;

    //Validate and create unique ID

    if(species=="Cat" && gender=="Male"){
      petId = "CM" + pId;
    } else if(species=="Cat" && gender=="Female"){
      petId  ="CF" + pId;
    } else if(species=="Dog" && gender=="Male"){
      petId= "DM" + pId;
    } else if(species=="Dog" && gender=="Female"){
      petId = "DF" + pId;
    } else {
      console.log("Please recheck the given Value.PID can not set.");
    }


    // Create a new profile
    const newpet = new pet({
      petName,
      petId,
      species,
      breed,
      gender,
      birth,
      weight,
      color,
      date,
      petStatus,
      image,
      price,
      systime
    });

    // Generate QR code
    QRCode.toDataURL(`Pet Name: ${petName}\nPet ID: ${petId}\nSpecies: ${species}\nBreed: ${breed}\nGender: ${gender}\nStatus: ${petStatus} \n More Details Pls contact Animal Manager of the shelter.\n ---- Thank you 😊----`, function (err, url) {
      if (err) {
        console.error(err);
       
        return res.status(500).json({ error: 'Failed to generate QR code' });
      }
      // Get the base64-encoded QR code image data from the URL
      const base64Image = url.split(',')[1];
      // Save the base64-encoded QR code to the database
      newpet.qrCode = base64Image;
      newpet.save()
        .then(() => {
          
          res.status(201).json({ message: 'Profile added', pet: newpet });
        })
        .catch((err) => {
      
          console.log(err);
         
          res.status(500).json({ error: 'Failed to add profile' });
        });
    });
  
});



// ------update pet profile-----

const profileUpdate = (async(req,res)=>{

  const {id} = req.params;
  const { petName,species,breed,gender,birth,date,weight,color,petStatus,image,price} = req.body;
  const systime = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" })
  const updatedProfileData = { petName,species,breed,gender,birth,date,weight,color,petStatus,image,price,systime};

  // Validate the request body
  if (!petName || !species || !breed || !gender || !birth ||!date || !weight || !color || !petStatus || !image || !price) {
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

   
      res.status(200).send({ status: 'Profile updated' });
  } catch (err) {
      console.log(`error:${err}`);
      res.status(500).send({ error: 'Internal server error' });
  }
});

//-------get one pet profile-------

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


//------delete profile------

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


//-----get all profiles----

const getallprofile=(async (req,res) => {
  try {
      // get all the profile

      const profiles= await pet.find();

      res.status(200).json({ profiles });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//------QR fetching-------

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

//-------------Shelter pets-----------------

const shelterpets=(async (req,res) => {
  try {
      // get all the profile
      const books= await booking.find();
     
      res.status(200).json({ books });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = { registerPet,profileUpdate,getProfile,deleteProfile,getallprofile,Qr,shelterpets}