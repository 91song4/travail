const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.json());

const router = require('./src/routes');

app.listen(process.env.PORT, () => {
  console.log(`http://127.0.0.1:${process.env.PORT}`);
});
