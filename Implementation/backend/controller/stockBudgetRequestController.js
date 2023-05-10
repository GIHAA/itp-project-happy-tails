const asyncHandler = require("express-async-handler");

const budget = require("../models/stockBudgetRequestModel");

//post-create
const createStockBudget = asyncHandler(async (req, res) => {


   const{supplier_name, item_name,description,total,status} = req.body
   console.log(supplier_name);

   const new_budget = await budget.create({
    supplier_name,
    item_name,
    description,
    total,status
   }) 

  new_budget
    ? res.status(201).json(new_budget)
    : res.status(400).json({ message: "Request did not inserted" });
});

//get-read
const getStockBudgets = asyncHandler(async (req, res) => {
  const new_budget = await budget.find({});
  res.json(new_budget);
});

//update
const editStockBudget = asyncHandler(async (req, res) => {

  const id = req.params.id
  const { supplier_name,item_name,description,total,status } = req.body

  const pay = await budget.findByIdAndUpdate(id, {
    supplier_name,
    item_name,
    description,
    total,status,
  });

  pay
  ? res.status(201).json(pay)
  : res.status(400).json({ message: "payment not updated" });
  })

//get one stock budget request

const getStockBudget = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const payment = await budget.findByIdAndUpdate(id, {});

  res.json(payment);
  console.log(payment);
});

//delete
const deleteStockBudget = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const new_budget = await budget.findByIdAndDelete(id);

  new_budget
    ? res.status(200).json(new_budget)
    : res.status(400).json({ message: "Request details not deleted" });
});

module.exports = {
  createStockBudget,
  getStockBudgets,
  deleteStockBudget,
  getStockBudget,
  editStockBudget,
};
