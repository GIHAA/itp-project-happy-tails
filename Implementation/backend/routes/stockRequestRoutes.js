const express = require('express');
const router = express.Router();

const {
    requestStock,
    getAllRequests

} = require('../controller/stockRequestController');


router.post('/stockrequest', requestStock);
router.get('/stockrequest', getAllRequests);

module.exports = router;