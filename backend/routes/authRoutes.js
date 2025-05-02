const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Registracija
router.post('/register', authController.register);

// Prisijungimas
router.post('/login', authController.login);

// Profilio atnaujinimas
router.patch('/update', authenticateToken, authController.update);

module.exports = router;
