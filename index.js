const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const db = require('./database/db');
const auth = require('./midleware/authentication');
const authPremium = require('./midleware/AuthenticatePremium');
const signup = require('./routes/signup');
const login = require('./routes/login');
const postexpense = require('./routes/postexpense');
const getexpense = require('./routes/getexpense');
const deleteexpense = require('./routes/deleteexpense');
const purchasepremium = require('./routes/purchasepremium');
const updatepremium = require('./routes/updatepremium');
const getleaderboard = require('./routes/getleaderboard');
const fgtpassword = require('./routes/resetPassword/forgotpassword');
const resetPasswordForm = require('./routes/resetPassword/resetPasswordForm');
const resetPassword = require('./routes/resetPassword/resetPassword');
const downloadexpense = require('./routes/downloadexpense');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const {user,expense,order,forgotpassword , fileurl} = db;
user.hasMany(expense);
expense.belongsTo(user);
user.hasMany(order)
user.hasMany(forgotpassword)
order.belongsTo(user);
user.hasMany(fileurl)

app.use(cors());
app.use(express.json());

db.sequelize.sync();

app.post('/login',login)
app.post('/signup',signup)
app.get('/varifypremium',authPremium ,(req,res)=>{
return res.json({success:true ,isPremiumUser:true});
})
app.post('/forgotpassword',fgtpassword)
app.get('/resetpassword/:token',resetPasswordForm)
app.post('/resetpassword/:token',resetPassword)

app.post('/expense',auth,postexpense)
app.get('/expense',auth,getexpense)
app.delete('/expense/:id',auth,deleteexpense)
app.get('/purchasepremium', auth , purchasepremium)
app.post('/purchasepremium/updatestatus', auth , updatepremium)
app.get('/leaderboard', authPremium, getleaderboard);
app.get('/downloadexpense', authPremium, downloadexpense);



app.listen(5000)