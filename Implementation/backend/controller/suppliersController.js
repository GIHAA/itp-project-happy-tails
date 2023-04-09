
const asyncHandler = require('express-async-handler')

const Supplier = require('../models/supplierModel')

 //post-create
 const addSuppliers =asyncHandler(async (req, res) => {

  console.log(req.body);
   const{name,phone,email,address,type} = req.body

   const supplier = await Supplier.create({
    name,
    phone,
    email,
    address,
    type
   }) 

   supplier ? res.status(201).json(supplier) : res.status(400).json({message: 'Supplier did not inserted'})
 })

//get-read 
const readSuppliers =asyncHandler(async (req, res) => {
  const supplier = await Supplier.find({})
  res.json(supplier)

})

// update Supplier profile
const updateSuppliers = (async(req,res)=>{

  const id = req.params.id;
  const { name,phone,email,address,type } = req.body;

  //check whether all values exists
  if (!name || !phone || !email || !address || !type) {
      res.status(400)
      throw new Error('Please add all fields')
  }


  const supplier = await Supplier.findByIdAndUpdate(id, {
    name,
    phone,
    email,
    address,
    type
  });

  supplier ? res.status(201).json(supplier) : res.status(400).json({ message : 'Supplier details not updated'});

});

//get one supplier profile

const getProfile = (async(req,res)=>{

  const { id } = req.params;
  
    let supplier = null;
  
    try {
        supplier = await Supplier.findOne({_id : id});
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }

    // check if supplier profile exists
    if (!supplier) {
        return res.status(404).json({
            error: 'Supplier profile not found'
        });
    }
    res.status(200).json({supplier})
  })

//delete
const deleteSuppliers = asyncHandler(async (req, res) =>{

  const id = req.params.id
  const supplier = await Supplier.findByIdAndDelete(id)

  supplier ? res.status(200).json(supplier) : res.status(400).json({message: 'Supplier details not deleted'})
})
 

module.exports={
    addSuppliers,
    readSuppliers,
    updateSuppliers,
    deleteSuppliers,
    getProfile
}




