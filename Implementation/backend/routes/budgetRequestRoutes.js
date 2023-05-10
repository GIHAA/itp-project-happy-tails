const express = require("express");
const router = express.Router();
const {
  reqBudget,
  getBudgets,
  deletebudget,
  editbudget,
  getbudget,
} = require("../controller/budgetRequestController");

router.post("/reqBudget", reqBudget);
router.get("/getBudgets", getBudgets);
router.delete("/deletebudget/:id", deletebudget);
router.put("/editbudget/:id", editbudget);
router.get("/getbudget/:id", getbudget);
module.exports = router;
