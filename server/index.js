const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const PORT = 4075;
app.listen(PORT, () => console.log(`Listening on Da Best Port around, ${PORT}`));