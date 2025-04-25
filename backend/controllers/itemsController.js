const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/items.json');

function readData() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

exports.getItems = (req, res) => {
  const items = readData().filter(item => item.userId === req.user.id);
  res.json(items);
};

exports.createItem = (req, res) => {
  const items = readData();
  const newItem = { id: Date.now(), userId: req.user.id, ...req.body };
  items.push(newItem);
  writeData(items);
  res.status(201).json(newItem);
};

exports.updateItem = (req, res) => {
  const { id } = req.params;
  const items = readData();
  const index = items.findIndex(item => item.id == id && item.userId === req.user.id);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    writeData(items);
    res.json(items[index]);
  } else {
    res.status(404).send('Item not found');
  }
};

exports.patchItem = (req, res) => {
  const { id } = req.params;
  const items = readData();
  const index = items.findIndex(item => item.id == id && item.userId === req.user.id);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    writeData(items);
    res.json(items[index]);
  } else {
    res.status(404).send('Item not found');
  }
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  let items = readData();
  items = items.filter(item => !(item.id == id && item.userId === req.user.id));
  writeData(items);
  res.status(204).send();
};
