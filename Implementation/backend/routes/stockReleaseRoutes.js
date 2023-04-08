const express = require('express');
const router = express.Router();


const {
    addRelease


} = require('../controller/stockReleaseController');


router.post('/releasestock', addRelease);



module.exports = router;