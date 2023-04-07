const express = require('express');
const router = express.Router();

const {
    requestStock,
    getAllRequests,
    updateRequestField,
    

} = require('../controller/stockRequestController');


router.post('/stockrequest', requestStock);
router.get('/stockrequest', getAllRequests);
router.put('/stockrequest/:id', updateRequestField)


module.exports = router;