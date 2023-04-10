const express = require('express');
const router = express.Router();


const {
    addRelease,
    readAllReleases


} = require('../controller/stockReleaseController');


router.post('/releasestock', addRelease);
router.get( '/readreleasestock' , readAllReleases);



module.exports = router;