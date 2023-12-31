const express = require('express');
require('dotenv').config();
const mongoConnect = require('./config')
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require("helmet");
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
// const downloadexpense = require('./routes/downloadexpense');

const app = express();
app.set('view engine', 'ejs');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());


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
// app.get('/downloadexpense', authPremium, downloadexpense);


mongoConnect().then(()=>{
    app.listen(process.env.PORT || 5000)
}).catch(err=>{console.log(err , 'couldn\'t connect')});