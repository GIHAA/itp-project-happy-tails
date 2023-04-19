

const asyncHandler = require('express-async-handler')
const VehReqPayment = require('../models/vehicleBudgetModel')




//post vehicle payment

const VehaddPayment = asyncHandler(async (req, res) => {

    const { req_title, plateNo, date, payment, status } = req.body

    const pay = await VehReqPayment.create({
        req_title,
        plateNo,
        date,
        payment,
        status
    })
    pay ? res.status(201).json(pay) : res.status(400).json({ message: 'payment not created' })
})


//get all vehicle payments

const VehreadAllPayment = asyncHandler(async (req, res) => {


    const payment = await VehReqPayment.find({})

    res.json(payment)
    console.log(payment);


})



//get vehicle payment by id

const VehreadPayment = asyncHandler(async (req, res) => {

    const id = req.params.id
    const payment = await VehReqPayment.findByIdAndUpdate(id, {})

    res.json(payment)
    console.log(payment);
})



//put vehicle payment

const VehupdatePayment = asyncHandler(async (req, res) => {

    const id = req.params.id
    const { req_title, date, payment, status } = req.body

    const pay = await VehReqPayment.findByIdAndUpdate(id, {

        req_title,
        plateNo,
        date,
        payment,
        status
    })

    pay ? res.status(201).json(pay) : res.status(400).json({ message: 'payment not updated' })
})


//delete vehicle payment

const VehdeletePayment = asyncHandler(async (req, res) => {

    const id = req.params.id
    const pay = await VehReqPayment.findByIdAndDelete(id)

    pay ? res.status(200).json(pay) : res.status(400).json({ message: 'payment not deleted' })
})


module.exports = {
    VehaddPayment,
    VehreadPayment,
    VehupdatePayment,
    VehdeletePayment,
    VehreadAllPayment,


}