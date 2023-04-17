const express = require('express');
const router = express.Router();

const {
    addItem,
    readAllItems,
    getOneItem,
    updateItem,
    deleteItem,
    updateQuantity

} = require('../controller/inventoryItemController');

const { protect , userProtect , adminProtect} = require('../middleware/authMiddleware');

router.post('/items', addItem);
router.get('/items', readAllItems);
router.get('/items/:id', getOneItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.put('/items/:itemcode/:qty', updateQuantity);


module.exports = router;