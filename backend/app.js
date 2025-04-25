const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/itemsRoutes');
const httpsOptions = require('./httpsOptions');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/items', itemsRoutes);

const PORT = 3001;

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on https://localhost:${PORT}`);
});
