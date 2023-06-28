const express = require('express');

const models = require('./models');

// connect mongoose
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

db.once('open', () => { app.listen(PORT, () => console.log(`MindFlip listening on PORT ${PORT}!`)); });
