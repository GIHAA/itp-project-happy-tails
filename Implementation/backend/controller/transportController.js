const asyncHandler = require('express-async-handler')

const Transport = require('../models/transportModel')
//post
const addTransport = asyncHandler(async (req, res) =>{    


    const { customerId,plocation,dlocation,petType,petGender,date,time,vaccineStatus,count } = req.body

    const transport = await Transport.create({
        customerId,
        plocation,
        dlocation,
        petType,
        petGender,
        date,
        time,
        vaccineStatus,
        count
        

    })

    transport ? res.status(201).json(transport) : res.status(400).json({message: 'Booking not created'})

})

//get
const readTransport = asyncHandler(async (req, res) =>{

    const transport = await Transport.find({})
    res.json(transport)
})

//put
const updateTransport = asyncHandler(async (req, res) =>{

    const id = req.params.id
    const { customerId,plocation,dlocation,petType,petGender,date,time,vaccineStatus,count } = req.body

    const transport = await Booking.findByIdAndUpdate(id, {
        customerId,
        plocation,
        dlocation,
        petType,
        petGender,
        date,
        time,
        vaccineStatus,
        count
        
    })

    transport ? res.status(201).json(transport) : res.status(400).json({message: 'Booking not updated'})
})

//delete
const deleteTransport = asyncHandler(async (req, res) =>{

    const id = req.params.id
    const transport = await Transport.findByIdAndDelete(id)

    transport ? res.status(200).json(transport) : res.status(400).json({message: 'Booking not deleted'})
})

module.exports = {
    addTransport,
    readTransport,
    updateTransport,
    deleteTransport
}
