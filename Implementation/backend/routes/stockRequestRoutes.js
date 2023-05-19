const express = require("express");
const router = express.Router();

const {
  requestStock,
  getAllRequests,
  updateRequestField,
  groupByCategory,
} = require("../controller/stockRequestController");

const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.post("/stockrequest", protect, requestStock);
router.get("/stockrequest", protect, getAllRequests);
router.get("/receivedstockprocessed", protect, groupByCategory);
router.put("/stockrequest/:id", protect, updateRequestField);

module.exports = router;
