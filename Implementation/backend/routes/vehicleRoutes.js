const express = require("express");
const router = express.Router();
const {
  readVehicle,
  addVehicle,
  getOneVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicleByPlateNo,
  getVCount,
} = require("../controller/vehicleController");
const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.post("/", protect, addVehicle);
router.get("/", protect, readVehicle);
router.get("/:id", protect, getOneVehicle);
router.put("/:id", protect, updateVehicle);
router.delete("/:id", deleteVehicle);
router.get("/search/:plateNo", protect, searchVehicleByPlateNo);
router.get("/vcount", protect, getVCount);

module.exports = router;
