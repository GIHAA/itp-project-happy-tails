const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const {reqstock,getStocks,deletestock,editstock,getstock} = require('../controller/stockRequestController')

router.post('/reqstock',reqstock)
router.get('/getStocks',getStocks)
router.delete('/deletestock/:id',deletestock)
router.put('/editstock/:id',editstock)
router.get('/getstock/:id',getstock)
=======

const {reqstock,getStocks,deletestock,editstock,getstock} = require('../controller/stockRequestController')

// router.post('/reqstock',reqstock)
// router.get('/getStocks',getStocks)
// router.delete('/deletestock/:id',deletestock)
// router.put('/editstock/:id',editstock)
// router.get('/getstock/:id',getstock)

>>>>>>> 08d9218f0558ac4c675122b0a82ca83f7303425b
module.exports = router;