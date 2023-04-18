const asyncHandler = require('express-async-handler')
const Cus = require('../models/cusDonationModel')


//post customer donation

const addcusDonation = asyncHandler(async (req, res) => {


    const {
        cus_id,
        description,
        price,
        payment_date,
        payment_time,
        status,
    } = req.body

    const Customer = await Cus.create({

        cus_id,
        description,
        price,
        payment_date,
        payment_time,
        status,
    })
    Customer ? res.status(201).json(Customer) : res.status(400).json({ message: 'cusDonation not created' })
})


//get customer donation
const readcusAllDonation = asyncHandler(async (req, res) => {


    
    const Customer = await Cus.find({})

    res.json(Customer)
    console.log(Customer);

    
   
})



//get customer donation by id 

const readcusDonation = asyncHandler(async (req, res) => {


    const id = req.params.id
    const Customer = await Cus.findByIdAndUpdate(id, {})

    res.json(Customer)
    console.log(Customer);
})


//put customer donation


const updatecusDonation = asyncHandler(async (req, res) => {

    const id = req.params.id
    const { 
        cus_id,
        description,
        price,
        payment_date,
        payment_time,
        status, } = req.body

    const Customer = await Cus.findByIdAndUpdate(id, {

        cus_id,
        description,
        price,
        payment_date,
        payment_time,
        status,
    })

    Customer ? res.status(201).json(Customer) : res.status(400).json({ message: 'cusDonation not updated' })
})


//delete customer donation


const deletecusDonation = asyncHandler(async (req, res) => {

    const id = req.params.id
    const Customer = await Cus.findByIdAndDelete(id)

    Customer ? res.status(200).json(Customer) : res.status(400).json({ message: 'cusDonation not deleted' })
})


module.exports = {
    addcusDonation,
    readcusDonation,
    readcusAllDonation,
    updatecusDonation,
    deletecusDonation

}