const express = require("express");
const router = express.Router();
const {
  VehaddPayment,
  VehreadPayment,
  VehupdatePayment,
  VehdeletePayment,
  VehreadAllPayment,
} = require("../controller/vehicleBudgetController");

const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");
// const { paymentValidation } = require('../middleware/cusDonaMiddleware')

router.post("/", protect, VehaddPayment);
router.get("/:id", protect, VehreadPayment);
router.get("/", protect, VehreadAllPayment);
router.put("/:id", VehupdatePayment);
router.delete("/:id", VehdeletePayment);
module.exports = router;
