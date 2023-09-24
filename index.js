const express = require('express');
const cors = require('cors');
const db = require('./db');
const signup = require('./routes/signup');
const login = require('./routes/login');
const postexpense = require('./routes/postexpense')
const getexpense = require('./routes/getexpense')
const deleteexpense = require('./routes/deleteexpense');
const auth = require('./authentication');


const app = express();

const user = db.user;
const expense = db.expense;
user.hasMany(expense)

app.use(cors());
app.use(express.json());

db.sequelize.sync();

app.post('/login',login)
app.post('/signup',signup)
app.post('/expense',auth,postexpense)
app.get('/expense',auth,getexpense)
app.delete('/expense/:id',auth,deleteexpense)



app.listen(5000)