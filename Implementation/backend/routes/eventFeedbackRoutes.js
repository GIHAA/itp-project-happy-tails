const express = require('express')
const router = express.Router()
const {addFeedback,getEFeedbacks,deleteFeedback} = require('../controller/eventFeedbackController')

router.post('/addFeedback',addFeedback)
router.get('/getEFeedbacks',getEFeedbacks)
router.delete('/deletefeedback/:id',deleteFeedback)

module.exports = router;