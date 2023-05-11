const express = require("express");
const router = express.Router();
const {
  addEvent,
  getEvents,
  getEvent,
  deleteEvent,
  editEvent,
} = require("../controller/eventController");
const { protect } = require("../middleware/authMiddleware");

router.post("/addEvent", protect, addEvent);
router.get("/getEvents", getEvents);
router.put("/editEvent/:id", editEvent);
router.get("/getEvent/:eventId", getEvent);
router.delete("/deleteEvent/:id", deleteEvent);

module.exports = router;
