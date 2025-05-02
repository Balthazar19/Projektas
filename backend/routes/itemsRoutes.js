const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { getItems, createItem, patchItem, deleteItem } = require('../controllers/itemsController');
const { validateItem } = require('../middleware/validateMiddleware');

router.get('/', authenticateToken, getItems);
router.post('/', authenticateToken, validateItem, createItem);
router.patch('/:id', authenticateToken, patchItem);
router.delete('/:id', authenticateToken, deleteItem);

module.exports = router;
