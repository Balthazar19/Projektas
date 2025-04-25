const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/itemsRoutes');
const authRoutes = require('./routes/authRoutes');
const httpsOptions = require('./httpsOptions');

const app = express();
const PORT = 3001;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/items', itemsRoutes);
app.use('/api/auth', authRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: '404 - Nerasta' });
});

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`✅ HTTPS Server veikia https://localhost:${PORT}`);
});
