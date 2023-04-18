const express = require('express')
const router = express.Router()


const {
    
    addorganization,
    readorganization,
    updateorganization,
    deleteorganization,
    
} = require('../controller/organizationController')

const { protect, userProtect, adminProtect } = require('../middleware/authMiddleware')
const { orgValidation } = require('../middleware/cusDonaMiddleware')

router.post('/',orgValidation, addorganization)
router.get('/', readorganization)
router.put('/:id',orgValidation,updateorganization)
router.delete('/:id', deleteorganization)


module.exports = router