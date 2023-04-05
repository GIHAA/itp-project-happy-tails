const express = require('express')
const router = express.Router()
const {
   readVehicle,
   addVehicle,
   updateVehicle,
   deleteVehicle,
} = require('../controller/VehicleController')
const { protect , userProtect , adminProtect} = require('../middleware/authMiddleware')

router.post('/', addVehicle)
router.get('/', readVehicle )
router.put('/:id',updateVehicle )
router.delete('/:id',deleteVehicle )


module.exports = router