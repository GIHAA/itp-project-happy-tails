const express = require("express");
const router = express.Router();
const {
  createStockBudget,
  getStockBudgets,
  deleteStockBudget,
  getStockBudget,
  editStockBudget,
} = require("../controller/stockBudgetRequestController");

router.post("/", createStockBudget);
router.get("/", getStockBudgets);
router.delete("/:id", deleteStockBudget);
router.get("/:id", getStockBudget);
router.put("/:id", editStockBudget);

module.exports = router;
