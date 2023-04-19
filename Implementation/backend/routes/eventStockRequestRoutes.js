const express = require('express')
const router = express.Router()
const {reqstock,getStocks,deletestock,editstock,getstock} = require('../controller/stockRequestController')

router.post('/reqstock',reqstock)
router.get('/getStocks',getStocks)
router.delete('/deletestock/:id',deletestock)
router.put('/editstock/:id',editstock)
router.get('/getstock/:id',getstock)
module.exports = router;