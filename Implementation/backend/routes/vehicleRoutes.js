const express = require("express");
const router = express.Router();
const {
<<<<<<< HEAD
   readVehicle,
   addVehicle,
   getOneVehicle,
   updateVehicle,
   updateVehicleStatus,
   deleteVehicle,
   searchVehicleByPlateNo,
=======
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
>>>>>>> 735415bdc6eb34bc6e06195684fd1681ae098d8a

router.post("/", addVehicle);
router.get("/", readVehicle);
router.get("/:id", getOneVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.get("/search/:plateNo", searchVehicleByPlateNo);

<<<<<<< HEAD
router.post('/', addVehicle)
router.get('/', readVehicle )
router.get('/:id', getOneVehicle )
router.put('/:id',updateVehicle )
router.put('/:id/status', updateVehicleStatus)
router.delete('/:id',deleteVehicle )
router.get('/search/:plateNo', searchVehicleByPlateNo);



module.exports = router
=======
module.exports = router;
>>>>>>> 735415bdc6eb34bc6e06195684fd1681ae098d8a
