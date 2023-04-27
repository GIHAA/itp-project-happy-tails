const express = require("express");
const router = express.Router();
const { sendEmail } = require("../services/emailService");

router.post("/", sendEmail);


module.exports = router;
