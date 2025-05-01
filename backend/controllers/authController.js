const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersPath = path.join(__dirname, '../data/users.json');
const SECRET = 'slaptazodis'; // tas pats kaip kitur

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

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'Toks vartotojas jau egzistuoja' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('Hashed password :' + hashedPassword);
    const newUser = { id: Date.now(), email: email, password: hashedPassword };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'Vartotojas sėkmingai sukurtas' });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ message: 'Neteisingas el. paštas arba slaptažodis' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({ message: 'Neteisingas el. paštas arba slaptažodis' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

    res.json({ token });
};
