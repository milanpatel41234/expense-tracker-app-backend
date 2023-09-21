const express = require('express');
const cors = require('cors');
const db = require('./db');
const signup = require('./routes/signup');
const login = require('./routes/login');


const app = express();

app.use(cors());
app.use(express.json());

db.sequelize.sync();

app.post('/login',login)
app.post('/signup',signup)



app.listen(5000)