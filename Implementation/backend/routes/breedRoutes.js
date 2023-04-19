const express = require('express')
const router = express.Router()
const {addbreed, getallbreeds, breedUpdate, deletebreed} = require('../controller/breedController')


router.post('/addbreed',addbreed)
router.get('/getbreed',getallbreeds)
router.put('/breedupdate/:id',breedUpdate)
router.delete('/deletebreed/:id',deletebreed)

module.exports = router