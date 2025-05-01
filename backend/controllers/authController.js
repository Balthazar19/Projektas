const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
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

function writeUsers(data) {
    fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
}

exports.register = (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    if (!email || !password) {
        return res.status(400).json({ message: 'Reikalingas el. paštas ir slaptažodis' });
    }

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'Toks vartotojas jau egzistuoja' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: Date.now(), email, password: hashedPassword };
    users.push(newUser);
    writeUsers(users);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, email: newUser.email });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    if (!email || !password) {
        return res.status(400).json({ message: 'Reikalingas el. paštas ir slaptažodis' });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Neteisingas el. paštas arba slaptažodis' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Neteisingas el. paštas arba slaptažodis' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
    res.json({ token, email: user.email });
};

exports.update = (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
        return res.status(404).json({ message: 'Vartotojas nerastas' });
    }

    if (email) user.email = email;
    if (password) user.password = bcrypt.hashSync(password, 10);

    writeUsers(users);
    res.json({ message: 'Profilis atnaujintas', email: user.email });
};
