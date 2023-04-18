const express = require('express')
const router = express.Router()
const {registerPet,profileUpdate, getProfile,deleteProfile,getallprofile, Qr, shelterpets} = require('../controller/petProfileController')


router.post('/addpet',registerPet)
router.put('/updateprofile/:id',profileUpdate)
router.get('/profile/:profileId',getProfile)
router.delete('/deleteprofile/:id',deleteProfile)
router.get('/getallprofile',getallprofile)

// router.get('/pets/qrcode/:id',Qr)
// router.get('/spets',shelterpets)



module.exports = router