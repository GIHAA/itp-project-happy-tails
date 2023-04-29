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

router.post("/", addAvailability);
router.get("/", readAvailability);
router.get("/:id", getOneAvailability);
router.put("/:id", updateAvailability);
router.delete("/:id", deleteAvailability);

module.exports = router;
