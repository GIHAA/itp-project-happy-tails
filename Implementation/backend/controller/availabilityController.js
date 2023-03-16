const asyncHandler = require('express-async-handler')

const Availability = require('../models/availabilityModel')


//post
const addAvailability = asyncHandler(async (req, res) =>{  

    const { plateNo, reason , since } = req.body

    const availability = await Availability.create({
        plateNo,
        reason,
        since
    })

    availability ? res.status(201).json(availability) : res.status(400).json({message: 'Availability not created'})


})


//get
const readAvailability = asyncHandler(async (req, res) =>{

    const availability = await Availability.find({})
    res.json(availability)
})


//put
const updateAvailability = asyncHandler(async (req, res) =>{

    const id = req.params.id
    const { plateNo, reason , since } = req.body

    const availability = await Availability.findByIdAndUpdate(id, {
        
        plateNo,
        reason,
        since
    })

    availability ? res.status(201).json(availability) : res.status(400).json({message: 'Availability not updated'})
})



//delete
const deleteAvailability = asyncHandler(async (req, res) =>{

    const id = req.params.id
    const availability = await Availability.findByIdAndDelete(id)

    availability ? res.status(200).json(availability) : res.status(400).json({message: 'Availability not deleted'})
})


module.exports = {
    addAvailability,
    readAvailability,
    updateAvailability,
    deleteAvailability,
}
    


