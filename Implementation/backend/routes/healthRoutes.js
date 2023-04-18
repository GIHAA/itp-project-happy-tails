const express = require('express')
const router = express.Router()
const { addReport,reportUpdate,getReport,deleteReport,getallReport, addVac, deleteVac} = require('../controller/healthController')


router.delete('/deletevac/:index/:id',deleteVac)
router.post('/addreport',addReport)
router.put('/reportupdate/:id/',reportUpdate)
router.put('/addvac/:id/',addVac)
router.get('/getreport/:id',getReport)
router.delete('/deletereport/:id',deleteReport)
router.get('/getallreport',getallReport)

module.exports = router