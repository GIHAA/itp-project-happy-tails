const express = require("express");
const router = express.Router();
const {
  readTransport,
  addTransport,
  updateTransport,
  deleteTransport,
  assignVehicle,
  getCount,
} = require("../controller/transportController");
const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.post("/", addTransport);
router.get("/", protect, readTransport);
router.put("/:id", protect, updateTransport);
router.delete("/:id", deleteTransport);
router.post("/assign-vehicle/:id", assignVehicle);
router.get("/count", protect, getCount);

module.exports = router;
