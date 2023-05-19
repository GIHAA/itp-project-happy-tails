const express = require("express");
const router = express.Router();
const {
  addAvailability,
  readAvailability,
  getOneAvailability,
  updateAvailability,
  deleteAvailability,
} = require("../controller/availabilityController");
const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.post("/", protect, addAvailability);
router.get("/", protect, readAvailability);
router.get("/:id", protect, getOneAvailability);
router.put("/:id", updateAvailability);
router.delete("/:id", deleteAvailability);

module.exports = router;
