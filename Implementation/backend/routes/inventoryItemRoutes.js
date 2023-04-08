const express = require('express');
const router = express.Router();

const {
    addItem,
    readAllItems,
    getOneItem,
    updateItem,
    deleteItem,
    addQuantity,
    subtractQuantity

} = require('../controller/inventoryItemController');

const { protect , userProtect , adminProtect} = require('../middleware/authMiddleware');

router.post('/items', addItem);
router.get('/items', readAllItems);
router.get('/items/:id', getOneItem);
router.put('/items/subtractqty', subtractQuantity);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.put('/items/:itemcode/:qty', addQuantity);




module.exports = router;