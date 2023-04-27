const express = require("express");
const router = express.Router();
const {
  readBooking,
  addBooking,
  updateBooking,
  deleteBooking,
  readUserBooking,
} = require("../controller/bookingController");
const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.post("/", protect, addBooking);
router.post("/user", protect, readUserBooking);
router.get("/:id", readBooking);
router.put("/", updateBooking);
router.delete("/:id", protect, deleteBooking);

module.exports = router;
