const express = require('express');
const router = express.Router();

const {
    addItem,
    readAllItems,
    updateItem,
    deleteItem

} = require('../controller/inventoryItemController');

const { protect , userProtect , adminProtect} = require('../middleware/authMiddleware');

router.post('/items', addItem);
router.get('/items', readAllItems);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);


module.exports = router;