const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

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
    const newUser = { id: Date.now(), email, password };
    users.push(newUser);
    writeUsers(users);
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
});

// Prisijungimas
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Neteisingi duomenys' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
