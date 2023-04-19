const express = require('express')
const router = express.Router()
const {

    addcusDonation,
    readcusDonation,
    updatecusDonation,
    deletecusDonation,
    readcusAllDonation
    
    
} = require('../controller/cusDonationController')

const { addUserValidation } = require('../middleware/cusDonaMiddleware')
const { protect, userProtect, adminProtect } = require('../middleware/authMiddleware')



router.post('/',addUserValidation,addcusDonation)
router.get('/', readcusAllDonation)
router.get('/:id', readcusDonation)
router.put('/:id',addUserValidation, updatecusDonation)
router.delete('/:id', deletecusDonation)


module.exports = router