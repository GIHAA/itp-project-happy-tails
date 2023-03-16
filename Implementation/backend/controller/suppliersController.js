
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
const updateSuppliers = asyncHandler(async (req, res) =>{

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
    deleteSuppliers
}




