const express = require("express");
const router = express.Router();
const {
  readSuppliers,
  addSuppliers,
  updateSuppliers,
  deleteSuppliers,
  getProfile,
} = require("../controller/suppliersController");

const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.post("/", protect, addSuppliers);
router.get("/", protect, readSuppliers);
router.put("/:id", protect, updateSuppliers);
router.get("/:id", protect, getProfile);
router.delete("/:id", protect, deleteSuppliers);

module.exports = router;
