const express = require("express");
const router = express.Router();
const { getevent, getbooking } = require("../services/qrService");

router.get("/event/:id", getevent);
router.get("/booking/:id", getbooking);

module.exports = router;
