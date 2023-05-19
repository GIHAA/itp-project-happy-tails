const express = require("express");
const router = express.Router();

const {
  addItem,
  readAllItems,
  getOneItem,
  updateItem,
  deleteItem,
  addQuantity,
  subtractQuantity,
  groupByCategory,
} = require("../controller/inventoryItemController");

const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.post("/items", protect, addItem);
router.get("/items", protect, readAllItems);
router.get("/items/qtyprocessed", protect, groupByCategory);
router.get("/items/:id", protect, getOneItem);
router.put("/items/subtractqty", protect, subtractQuantity);
router.put("/items/:id", protect, updateItem);
router.delete("/items/:id", protect, deleteItem);
router.put("/items/:itemcode/:qty", protect, addQuantity);

module.exports = router;
