const express = require('express')
const router = express.Router()
const {addeamount,geteamounts,deleteeamount,geteamount,editeamount} = require('../controller/eventAmountController')

router.post('/addeamount',addeamount)
router.get('/geteamounts',geteamounts)
router.delete('/deleteeamount/:id',deleteeamount)
router.put('/editeamount/:id',editeamount)
router.get('/geteamount/:id',geteamount)
module.exports = router;