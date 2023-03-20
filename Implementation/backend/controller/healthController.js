const Joi = require('joi');
const report = require('../models/healthModel');
const pet = require('../models/petModel');
const{validateReport}=require('../validations/vetValidation')


const addReport = (async (req, res) => {
console.log(req.body)
  // Validate the request body
  const { error } = validateReport(req.body);
  if (error)
  return res.status(400).json({ error: error.details[0].message });

  // Check if the petId exists in the pet collection
  const petProfile = await pet.findOne({ petId: req.body.petId });
  if (!petProfile) 
  return res.status(400).json({ error: 'Invalid petId' });

  // Create a new health report
  const newReport = new report({
    petId: req.body.petId,
    currentHealthStatus: req.body.currentHealthStatus,
    vaccinations: req.body.vaccinations
    
  });

  // Save the health report to the database
  newReport.save()
    .then(() => {
      // Respond with success message
      res.status(201).json({ message: 'Report Saved' });
    })
    .catch((err) => {
      // Log the error
      console.log(err);
      // Respond with an error message
      res.status(500).json({ error: 'Failed to save report due' });
    })});

    module.exports = {addReport}