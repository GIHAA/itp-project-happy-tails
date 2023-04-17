const express = require('express')
const router = express.Router()
const {registerevent,getallbooking} = require('../controller/registerEventController')

router.post('/addbooking',registerevent)
router.get('/getbooking',getallbooking)

module.exports = router;