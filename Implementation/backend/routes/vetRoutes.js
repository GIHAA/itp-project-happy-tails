const express = require('express')
const router = express.Router()
const {registerPet,profileUpdate, getProfile,deleteProfile,getallprofile} = require('../controller/vetController')

router.post('/addpet',registerPet)
router.put('/updateprofile/:id',profileUpdate)
router.get('/profile/:profileId',getProfile)
router.delete('/deleteprofile/:id',deleteProfile)
router.get('/getallprofile',getallprofile)

module.exports = router