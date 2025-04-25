const express = require('express');
const router = express.Router();
const { getItems, createItem, updateItem, patchItem, deleteItem } = require('../controllers/itemsController');
const { validateItem } = require('../middleware/validateMiddleware');

router.get('/', getItems);
router.post('/', validateItem, createItem);
router.put('/:id', validateItem, updateItem);
router.patch('/:id', patchItem);
router.delete('/:id', deleteItem);

module.exports = router;
