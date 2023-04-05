const asyncHandler = require('express-async-handler')

const Vehicle = require('../models/vehicleModel')


//post
const addVehicle = asyncHandler(async (req, res) =>{  

    const { plateNo, driverId , agentId, vModel, insuranceExpirationDate } = req.body

    const vehicle = await Vehicle.create({
        plateNo,
        driverId,
        agentId,
        vModel, 
        insuranceExpirationDate
    })

    vehicle ? res.status(201).json(vehicle) : res.status(400).json({message: 'Vehicle not created'})


})


//get
const readVehicle = asyncHandler(async (req, res) =>{

    const vehicle = await Vehicle.find({})
    res.json(vehicle)
})


//put
const updateVehicle = asyncHandler(async (req, res) =>{

    const id = req.params.id
    const { plateNo, driverId , agentId, vModel, insuranceExpirationDate } = req.body

    const vehicle = await Vehicle.findByIdAndUpdate(id, {
        
        plateNo,
        driverId ,
        agentId,
        vModel, 
        insuranceExpirationDate
    })

    vehicle ? res.status(201).json(vehicle) : res.status(400).json({message: 'Vehicle not updated'})
})



//delete
const deleteVehicle = asyncHandler(async (req, res) =>{

    const id = req.params.id
    const vehicle = await Vehicle.findByIdAndDelete(id)

    vehicle ? res.status(200).json(vehicle) : res.status(400).json({message: 'Vehicle not deleted'})
})


module.exports = {
    addVehicle,
    readVehicle,
    updateVehicle,
    deleteVehicle,
}
    


