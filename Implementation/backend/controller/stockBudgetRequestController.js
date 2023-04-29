const asyncHandler = require("express-async-handler");

const budget = require("../models/stockBudgetRequestModel");

//post-create
const createStockBudget = asyncHandler(async (req, res) => {
  const { supplier_name, item_name, description, total } = req.body;
  console.log(supplier_name);

<<<<<<< HEAD
   const{supplier_name, item_name,description,total,status} = req.body
   console.log(supplier_name);

   const new_budget = await budget.create({
    supplier_name,
    item_name,
    description,
    total,status
   }) 
=======
  const new_budget = await budget.create({
    supplier_name,
    item_name,
    description,
    total,
  });
>>>>>>> b11d283dbe1680def8ce497d049077edf29d482f

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
<<<<<<< HEAD

  const id = req.params.id
  const { supplier_name,item_name,description,total,status } = req.body
=======
  const id = req.params.id;
  const { supplier_name, item_name, description, total } = req.body;
>>>>>>> b11d283dbe1680def8ce497d049077edf29d482f

  const pay = await budget.findByIdAndUpdate(id, {
    supplier_name,
    item_name,
    description,
    total,
  });

<<<<<<< HEAD
     supplier_name,item_name,description,total,status
  })
=======
  pay
    ? res.status(201).json(pay)
    : res.status(400).json({ message: "payment not updated" });
});
>>>>>>> b11d283dbe1680def8ce497d049077edf29d482f

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
