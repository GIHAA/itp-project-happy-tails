const express = require('express')
const router = express.Router()
const {

    VehaddPayment,
    VehreadPayment,
    VehupdatePayment,
    VehdeletePayment,
    VehreadAllPayment,


} = require('../controller/vehicleBudgetController')

const { protect, userProtect, adminProtect } = require('../middleware/authMiddleware')
// const { paymentValidation } = require('../middleware/cusDonaMiddleware')

router.post('/', VehaddPayment)
router.get('/:id', VehreadPayment)
router.get('/', VehreadAllPayment)
router.put('/:id', VehupdatePayment)
router.delete('/:id', VehdeletePayment)


module.exports = router