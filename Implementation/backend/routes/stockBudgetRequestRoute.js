const express = require("express");
const router = express.Router();
const {
  createStockBudget,
  getStockBudgets,
  deleteStockBudget,
  getStockBudget,
  editStockBudget,
} = require("../controller/stockBudgetRequestController");

const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.post("/", protect, createStockBudget);
router.get("/", protect, getStockBudgets);
router.delete("/:id", protect, deleteStockBudget);
router.get("/:id", protect, getStockBudget);
router.put("/:id", protect, editStockBudget);

module.exports = router;
