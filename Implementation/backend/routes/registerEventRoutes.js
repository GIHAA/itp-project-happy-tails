const express = require('express')
const router = express.Router()
const {registerevent,getallbooking,deleteBooking, getBooking, editBooking} = require('../controller/registerEventController')

router.post('/addbooking',registerevent)
router.get('/getbooking',getallbooking)
router.delete('/deletebook/:id',deleteBooking)
router.put('/editBooking/:id',editBooking)
router.get('/getbooking/:bookId',getBooking)
module.exports = router;