const express = require("express");
const router = express.Router();

const {
  addFeedback,
  viewFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../controller/feedbackController");
const { protect, adminProtect } = require("../middleware/authMiddleware");

router.get("/", viewFeedback);
router.post("/", addFeedback);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;
