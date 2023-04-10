const express = require('express');
const router = express.Router();

const {
    requestStock,
    getAllRequests,
    updateRequestField,
    getReceivedRequests
    

} = require('../controller/stockRequestController');


router.post('/stockrequest', requestStock);
router.get('/stockrequest', getAllRequests);
router.get('/stockrequestreceived', getReceivedRequests);
router.put('/stockrequest/:id', updateRequestField)


module.exports = router;