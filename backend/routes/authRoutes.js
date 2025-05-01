const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/authMiddleware');
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname, '../data/users.json');
const SECRET = 'slaptazodis';

function readUsers() {
    if (!fs.existsSync(usersPath)) {
        fs.writeFileSync(usersPath, JSON.stringify([]));
    }
    const data = fs.readFileSync(usersPath);
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

// Registracija
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Vartotojas jau egzistuoja' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: Date.now(), email, hashedPassword };
    users.push(newUser);
    writeUsers(users);
    const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, email: newUser.email });
});

// Prisijungimas
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Neteisingi duomenys' });
    }
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ token, email: user.email });
});

router.patch('/update', authenticateToken, (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
        return res.status(404).json({ error: 'Vartotojas nerastas' });
    }

    if (email) user.email = email;
    if (password) user.password = password;

    writeUsers(users);

    res.json({ message: 'Profilis atnaujintas', email: user.email });
});

module.exports = router;