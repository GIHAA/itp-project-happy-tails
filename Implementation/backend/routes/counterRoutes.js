const express = require('express')
const router = express.Router()
const {
    addCount,
    getCount,
} = require('../controller/counterController')

router.post('/' , addCount)

module.exports = router