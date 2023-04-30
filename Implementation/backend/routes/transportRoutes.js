const express = require("express");
const router = express.Router();
const {
  readTransport,
  addTransport,
  updateTransport,
  deleteTransport,
  assignVehicle,
  getCount,
} = require("../controller/transportController");
const {
  protect,
  userProtect,
  adminProtect,
} = require("../middleware/authMiddleware");

router.post('/', addTransport);
router.get('/', readTransport);
router.put('/:id', updateTransport);
router.delete('/:id', deleteTransport);
router.post('/assign-vehicle', assignVehicle);
router.get('/count', getCount);

module.exports = router;
