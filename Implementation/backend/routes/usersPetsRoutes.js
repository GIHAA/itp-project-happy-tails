const express = require("express");

const router = express.Router();
const {
  get,
  add,
  update,
  remove,
} = require("../controller/usersPetsController");
const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.get("/:id", protect, get);
router.post("/", protect, add);
router.put("/", protect, update);
router.delete("/", protect, remove);

module.exports = router;
