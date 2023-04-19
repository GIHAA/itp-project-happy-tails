const pet = require('../models/petModel');
const breed = require('../models/breedModel');
const report = require('../models/healthModel');


//-------------healthstatus count-----------------

const statusCount = async (req, res) => {
    try {
      const normalCount = await report.countDocuments({ currentHealthStatus: 'Normal' });
      const criticalCount = await report.countDocuments({ currentHealthStatus: 'Critical' });
      res.json({ normalCount, criticalCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting pet counts' });
    }
  }


  
//adopted and available pet count

const petstatusCount = async (req, res) => {
    try {
      const adpCount = await pet.countDocuments({ petStatus: 'Adopted' });
     
      const avaCount = await pet.countDocuments({ petStatus: 'Available' });
      
      res.json({ adpCount, avaCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting pet counts' });
    }
  }

  //get last five breed


const lastFive = async (req, res) => {
    try {
      const totalBreedsCount = await breed.countDocuments();
      const limit = Math.min(totalBreedsCount, 5); // Limit to 5 or totalBreedsCount, whichever is smaller
      const breeds = await breed.find().sort({ createdAt: -1 }).skip(totalBreedsCount - limit);
      res.json(breeds);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  
//get last five added pets


const lastpetprofile = async (req, res) => {
    try {
      const totalCount = await pet.countDocuments();
      const limit = Math.min(totalCount, 5);
      const petProfiles = await pet.find().sort({ createdAt: -1 }).skip(totalCount- limit);
      res.json(petProfiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  
  module.exports = {petstatusCount,lastFive,lastpetprofile,statusCount}
  
  