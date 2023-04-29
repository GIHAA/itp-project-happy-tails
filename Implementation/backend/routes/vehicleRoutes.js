const express = require("express");
const router = express.Router();
const {
  readVehicle,
  addVehicle,
  getOneVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicleByPlateNo,
} = require("../controller/vehicleController");
const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.post("/", addVehicle);
router.get("/", readVehicle);
router.get("/:id", getOneVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.get("/search/:plateNo", searchVehicleByPlateNo);

module.exports = router;
