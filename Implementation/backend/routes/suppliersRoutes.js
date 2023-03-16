const express = require('express')
const router = express.Router()
const {
 readSuppliers,
 addSuppliers,
 updateSuppliers,
 deleteSuppliers
} = require('../controller/suppliersController')
const { protect , userProtect , adminProtect} = require('../middleware/authMiddleware')

router.post('/',addSuppliers )
router.get('/' ,readSuppliers )
router.put('/:id' , updateSuppliers)
router.delete('/:id' ,deleteSuppliers )



module.exports = router