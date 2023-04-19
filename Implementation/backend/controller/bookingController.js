const asyncHandler = require('express-async-handler')
const Booking = require('../models/bookingModel')

const addBooking = asyncHandler(async (req, res) =>{    
    console.log(req.body)

    const {cus_id ,contactNumbers,  description , startDate , endDate , mini } = req.body

    const booking = await Booking.create({
        cus_id,
        contactNumbers,
        description,
        startDate,
        endDate,
        mini,
    })

    booking ? res.status(201).json(booking) : res.status(400).json({message: 'Booking not created'})

})


const readBooking = asyncHandler(async (req, res) =>{

    const booking = await Booking.find({})
    res.json(booking)
})

const readUserBooking = asyncHandler(async (req, res) =>{
    console.log(req.body._id)
    const booking = await Booking.find({cus_id : req.body._id})
    console.log(booking)
    res.json(booking)
})


const updateBooking = asyncHandler(async (req, res) =>{

    const id = req.params.id
    const { description , startDate , endDate , status } = req.body

    console.log("status")

    const booking = await Booking.findByIdAndUpdate(id, {
        description,
        startDate,
        endDate,
        status
    })

    booking ? res.status(201).json(booking) : res.status(400).json({message: 'Booking not updated'})
})


const deleteBooking = asyncHandler(async (req, res) =>{

    const id = req.params.id
    const booking = await Booking.findByIdAndDelete(id)

    booking ? res.status(200).json(booking) : res.status(400).json({message: 'Booking not deleted'})
})

module.exports = {
    addBooking,
    readBooking,
    updateBooking,
    deleteBooking,
    readUserBooking
}
