const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const auth = require('./contorllers/authController');
require('dotenv').config();

const app = express();
massive(process.env.CONNECTION_STRING).then((db) => {
    app.set('db', db)
    console.log("App's connected To Massive")
})

app.use(session({
secret: '978675645ersfcgvhu9y8t7r6dt',
saveUninitialized: false,
resave: false,
}));
app.use(express.static(`${__dirname}/../build`));

app.post('/register/:username/:password', auth.register);
app.post('/login/:username/:password', auth.login);
app.post('/logout', auth.logout);

app.use(bodyParser.json());

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4075;
app.listen(PORT, () => console.log(`Listenin on da best port around, ${PORT}`));