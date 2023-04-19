const breed = require('../models/breedModel');


//-------------Add Breed------------------

const addbreed = ((req, res) => {

    const { breeds,speciesOne } = req.body;
  
    console.log(breeds)
  
    // Create a new breed
    const newbreed = new breed({
      breed:breeds,
      species:speciesOne,
      date:new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" })
     
    });
    
      newbreed.save()
        .then(() => {
          
          res.status(201).json({ message: 'Profile added', breed: newbreed });
        })
        .catch((err) => {
          // Log the error
          console.log(err);
          // Respond with an error message
          res.status(500).json({ error: 'Failed to add profile' });
        });
  
  });


  //--------get all breeds----------

const getallbreeds=(async (req,res) => {
    try {
        // get all the breed
        const allbreed= await breed.find();
        // return the all the breed
        res.status(200).json({ allbreed });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
  });


  //------- update pet breed----------

const breedUpdate = (async(req,res)=>{

    const {id} = req.params;
    const { breeds,speciesOne } = req.body;
    const updatedBreedData = {breed:breeds,species:speciesOne};
  
    try {
        // Ensure the breed belongs to the user making the request
        const petBreed = await breed.findOne({ _id: id });
    
        if (!petBreed) {
            return res.status(404).send({ error: 'Breed not found' });
        }
  
        // Update the breed
        await breed.findOneAndUpdate({ _id: id }, updatedBreedData);
  
        // Return success response
        res.status(200).send({ status: 'Breed updated' });
    } catch (err) {
        console.log(`error:${err}`);
        res.status(500).send({ error: 'Internal server error' });
    }
  });
  

  //delete breed

const deletebreed = (async (req, res) => {

    const { id } = req.params;
    try {
        // Check if the breed exists
        const deletedBreed = await breed.findOne({_id:id});
        if (!deletedBreed) {
            return res.status(404).json({ error: 'profile not found' });
        }
        // Delete the profile
        await breed.findOneAndDelete({_id:id});
  
        return res.status(200).json({ message: 'profile deleted successfully', deletedBreed });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = {addbreed,getallbreeds,breedUpdate,deletebreed}