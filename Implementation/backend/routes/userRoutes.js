const express = require("express");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  viewUsers,
  deleteAdmin,
  updateAdmin,
  forgotUser
} = require("../controller/userController");
const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.get('/', viewUsers)
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/update", protect, userProtect, updateUser);
router.post("/forgot", forgotUser);
router.delete("/", protect, userProtect, deleteUser);

//admin
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
