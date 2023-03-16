const express = require('express');
const router = express.Router();

const {
    addItem,
    readAllItems,
    updateItem,
    deleteItem

} = require('../controller/inventoryController');

const { protect , userProtect , adminProtect} = require('../middleware/authMiddleware');

router.post('/items', protect, addItem);
router.get('/items', protect, readAllItems);
router.put('/items/:id', protect, updateItem);
router.delete('/items/:id', protect, deleteItem);


module.exports = router;