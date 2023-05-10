const express = require("express");
const router = express.Router();

const {
  addRelease,
  readAllReleases,
  groupByCategory,
} = require("../controller/stockReleaseController");

const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");


router.post("/releasestock",protect, addRelease);
router.get("/readreleasestock",protect, readAllReleases);
router.get("/releasestockprocessed",protect, groupByCategory);

module.exports = router;
