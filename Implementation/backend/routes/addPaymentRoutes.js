const express = require("express");
const router = express.Router();
const {
  addPayment,
  readPayment,
  updatePayment,
  deletePayment,
  readAllPayment,
} = require("../controller/paymentController");

const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");
const { paymentValidation } = require("../middleware/cusDonaMiddleware");

router.post("/", paymentValidation, addPayment);
router.get("/:id", readPayment);
router.get("/", readAllPayment);
router.put("/:id", paymentValidation, updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
