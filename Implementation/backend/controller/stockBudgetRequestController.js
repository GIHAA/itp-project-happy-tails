const asyncHandler = require('express-async-handler')

const budget = require('../models/stockBudgetRequestModel')

 //post-create
 const createStockBudget =asyncHandler(async (req, res) => {

   const{supplier_name,supplier_ID, item_name,description,total,status,amountStatus } = req.body

   const new_budget = await budget.create({
    supplier_name,
    supplier_ID,
    item_name,
    description,
    total,
    status,
    amountStatus
   }) 

   new_budget ? res.status(201).json(new_budget) : res.status(400).json({message: 'Request did not inserted'})
 })

//get-read 
const getStockBudgets =asyncHandler(async (req, res) => {
  const new_budget = await budget.find({})
  res.json(new_budget)

})

// update request 
const editStockBudget = (async(req,res)=>{

  const id = req.params.id;
  const {supplier_name,supplier_ID, item_name,description,total,status,amountStatus} = req.body;

  //check whether all values exists
  if (!supplier_name || !supplier_ID || !item_name || !description || !total||!status||!amountStatus) {
      res.status(400)
      throw new Error('Please add all fields')
  }


  const new_budget = await budget.findByIdAndUpdate(id, {
    supplier_name,
    supplier_ID,
    item_name,
    description,
    total,
    status,
    amountStatus
  });

  new_budget ? res.status(201).json(new_budget) : res.status(400).json({ message : 'Request details not updated'});

});

//get one stock budget request 

const getStockBudget = (async(req,res)=>{

  const { id } = req.params;
  
    let new_budget = null;
  
    try {
      new_budget = await new_budget.findOne({_id : id});
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }

    // check if stock budget request exists
    if (!new_budget) {
        return res.status(404).json({
            error: 'Request details not found'
        });
    }
    res.status(200).json({new_budget})
  })

//delete
const deleteStockBudget = asyncHandler(async (req, res) =>{

  const id = req.params.id
  const new_budget = await budget.findByIdAndDelete(id)

  new_budget ? res.status(200).json(new_budget) : res.status(400).json({message: 'Request details not deleted'})
})
 

module.exports={
  createStockBudget,getStockBudgets,deleteStockBudget,getStockBudget,editStockBudget
}





