const { result } = require("@hapi/joi/lib/base");
const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");

//post transaction

const addtransaction = asyncHandler(async (req, res) => {
  const {
    tran_title,
    tran_type,
    tran_target,
    tran_amount,
    tran_date,
    tran_time,
    tran_status,
  } = req.body;

  const TRAN = await Transaction.create({
    tran_title,
    tran_type,
    tran_target,
    tran_amount,
    tran_date,
    tran_time,
    tran_status,
  });
  TRAN
    ? res.status(201).json(TRAN)
    : res.status(400).json({ message: "Transaction not created" });
});

//get all transaction

const readAlltransaction = asyncHandler(async (req, res) => {
  const transfer = await Transaction.find({});
  let totalTransaction = 0;

  res.json(transfer);
});

//get transaction by id

const readtransaction = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const transfer = await Transaction.findByIdAndUpdate(id, {});

  res.json(transfer);
  console.log(transfer);
});

//put transaction

const updatetransaction = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {
    tran_title,
    tran_type,
    tran_target,
    tran_amount,
    tran_date,
    tran_time,
    tran_status,
  } = req.body;

  const transfer = await Transaction.findByIdAndUpdate(id, {
    tran_title,
    tran_type,
    tran_target,
    tran_amount,
    tran_date,
    tran_time,
    tran_status,
  });

  transfer
    ? res.status(201).json(transfer)
    : res.status(400).json({ message: "Transaction not updated" });
});

//delete transaction

const deletetransaction = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const transfer = await Transaction.findByIdAndDelete(id);

  transfer
    ? res.status(200).json(transfer)
    : res.status(400).json({ message: "Transaction not deleted" });
});

module.exports = {
  addtransaction,
  readtransaction,
  readAlltransaction,
  updatetransaction,
  deletetransaction,
};
