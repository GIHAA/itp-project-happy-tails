const express = require("express");
const router = express.Router();

const {
  addtransaction,
  readtransaction,
  updatetransaction,
  deletetransaction,
  readAlltransaction,
} = require("../controller/transactionController");

const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");
const { transferValidation } = require("../middleware/cusDonaMiddleware");

router.post("/", transferValidation, addtransaction);
router.get("/:id", readtransaction);
router.get("/", readAlltransaction);
router.put("/:id", transferValidation, updatetransaction);
router.delete("/:id", deletetransaction);

module.exports = router;
