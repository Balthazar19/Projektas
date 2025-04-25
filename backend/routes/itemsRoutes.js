const express = require('express');
const router = express.Router();
const { getItems, createItem, updateItem, patchItem, deleteItem } = require('../controllers/itemsController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateItem } = require('../middleware/validateMiddleware');

// GET /api/items
router.get('/', authenticateToken, getItems);

// POST /api/items
router.post('/', authenticateToken, validateItem, createItem);

// PUT /api/items/:id
router.put('/:id', authenticateToken, validateItem, updateItem);

// PATCH /api/items/:id
router.patch('/:id', authenticateToken, patchItem);

// DELETE /api/items/:id
router.delete('/:id', authenticateToken, deleteItem);

module.exports = router;
