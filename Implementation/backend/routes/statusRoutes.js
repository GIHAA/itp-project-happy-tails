const express = require('express')
const router = express.Router()
const {petstatusCount, lastFive, lastpetprofile,statusCount} = require('../controller/petStatusController')

router.get('/statuscount',statusCount)
router.get('/petcount',petstatusCount)
router.get('/lastbreed',lastFive)
router.get('/lastpets',lastpetprofile)


module.exports = router