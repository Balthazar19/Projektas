const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Registracija
router.post('/register', authController.register);

// Prisijungimas
router.post('/login', authController.login);

// Profilio atnaujinimas (jei reikalingas)
router.patch('/update', authenticateToken, authController.update); // jei turi update logiką

module.exports = router;
