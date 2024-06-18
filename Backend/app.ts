const express = require('express');
require('dotenv').config({ path: `./config/.env` });
const compression = require('compression');

const host = process.env.HOST;
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));