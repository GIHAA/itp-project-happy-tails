const asyncHandler = require("express-async-handler");
const Payment = require("../models/addPaymentModel");

//post user payment

const addPayment = asyncHandler(async (req, res) => {
  const { cus_id, pet_id, payment, status } = req.body;

  const pay = await Payment.create({
    cus_id,
    pet_id,
    payment,
    status,
  });
  pay
    ? res.status(201).json(pay)
    : res.status(400).json({ message: "payment not created" });
});

//get all user payments

const readAllPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.find({});

  res.json(payment);
  // console.log(payment);
});

//get user payment by id

const readPayment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const payment = await Payment.findByIdAndUpdate(id, {});

  res.json(payment);
  // console.log(payment);
});

//put user payment

const updatePayment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { cus_id, pet_id, payment, status } = req.body;

  console.log(cus_id);
  const pay = await Payment.findByIdAndUpdate(id, {
    cus_id,
    pet_id,
    payment,
    status,
  });

  pay
    ? res.status(201).json(pay)
    : res.status(400).json({ message: "payment not updated" });
});

//delete user payment

const deletePayment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const pay = await Payment.findByIdAndDelete(id);

  pay
    ? res.status(200).json(pay)
    : res.status(400).json({ message: "payment not deleted" });
});

module.exports = {
  addPayment,
  readPayment,
  updatePayment,
  deletePayment,
  readAllPayment,
};
