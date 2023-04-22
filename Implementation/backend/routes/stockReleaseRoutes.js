const express = require("express");
const router = express.Router();

const {
  addRelease,
  readAllReleases,
  groupByCategory,
} = require("../controller/stockReleaseController");

router.post("/releasestock", addRelease);
router.get("/readreleasestock", readAllReleases);
router.get("/releasestockprocessed", groupByCategory);

module.exports = router;
