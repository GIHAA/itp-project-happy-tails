const express = require('express')
const router = express.Router()
const {
    readBooking,
    addBooking,
    updateBooking,
    deleteBooking,
    readUserBooking
} = require('../controller/bookingController')
const { protect , userProtect , adminProtect} = require('../middleware/authMiddleware')

router.post('/', protect , addBooking )
router.post('/user', protect  , readUserBooking )
router.get('/' , readBooking )
<<<<<<< HEAD
router.put('/' , updateBooking)
=======
router.put('/', updateBooking)
>>>>>>> 1510efa79ca62e8b8c07c7c06bf7d01166077e65
router.delete('/:id', protect , deleteBooking )


module.exports = router