const express = require('express')
const router = express.Router()
const {addFeedback,getEFeedbacks} = require('../controller/eventFeedbackController')

router.post('/addFeedback',addFeedback)
router.get('/getEFeedbacks',getEFeedbacks)

module.exports = router;