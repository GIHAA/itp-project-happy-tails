
const asyncHandler = require('express-async-handler')

const Supplier = require('../models/supplierModel')

 //create
 const addSuppliers =asyncHandler(async (req, res) => {

   //console.log(req.body);
   const{fname,lname,phone,email,address,type} = req.body

   const supplier = await Supplier.create({
    fname,
    lname,
    phone,
    email,
    address,
    type
   }) 

   supplier ? res.status(201).json(supplier) : res.status(400).json({message: 'Supplier did not inserted'})
 })

//read
const readSuppliers =asyncHandler(async (req, res) => {
  const supplier = await Supplier.find({})
  res.json(supplier)

})

//update
/*const updateSuppliers = asyncHandler(async (req, res) =>{

  const id = req.params.id
  const { fname,lname,phone,email,address,type} = req.body

  const supplier = await Supplier.findByIdAndUpdate(id, {
    fname,
    lname,
    phone,
    email,
    address,
    type
  })

  supplier ? res.status(201).json(supplier) : res.status(400).json({message: 'Supplier details  not updated'})
})*/




// update Supplier profile
const updateSuppliers = (async(req,res)=>{

    const {id} = req.params;
    const { fname,lname,phone,email,address,type} = req.body;
    const updatedProfileData = { fname,lname,phone,email,address,type};
  
    // Validate the request body
    if (!fname || !lname || !phone || !email || !address ||!type ) {
        return res.status(400).send({ error: 'Missing required fields' });
    }
  
    try {
        // Ensure the profile belongs to the user making the request
        const profile = await Supplier.findOne({ _id });
    
        if (!profile) {
            return res.status(404).send({ error: 'Profile not found' });
        }
  
        // Update the profile
        await Supplier.findOneAndUpdate({ _id }, updatedProfileData);
  
        // Return success response
        res.status(200).send({ status: 'Profile updated' });
    } catch (err) {
        console.log(`error:${err}`);
        res.status(500).send({ error: 'Internal server error' });
    }
  });

//get one supplier profile

const getProfile = (async(req,res)=>{

  const { profileId } = req.params;

  let profile = null;

  try {
      profile = await Supplier.findOne({_id:profileId});
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
const deleteSuppliers = (async (req, res) => {

  const { id } = req.params;
  try {
      // Check if the profile exists
      const deletedProfile = await Supplier.findOne({petId:id});
      if (!deletedProfile) {
          return res.status(404).json({ error: 'profile not found' });
      }
      // Delete the profile
      await Supplier.findOneAndDelete({_id});

      return res.status(200).json({ message: 'profile deleted successfully', deletedProfile });
  } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
  }
});




//delete
/*const deleteSuppliers = asyncHandler(async (req, res) =>{

  const id = req.params.id
  const supplier = await Supplier.findByIdAndDelete(id)

  supplier ? res.status(200).json(supplier) : res.status(400).json({message: 'Supplier details not deleted'})
})*/
 

module.exports={
    addSuppliers,
    readSuppliers,
    updateSuppliers,
    deleteSuppliers,
    getProfile
}




