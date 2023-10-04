const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const auth = require('./midleware/authentication');
const authPremium = require('./midleware/AuthenticatePremium')
const signup = require('./routes/signup');
const login = require('./routes/login');
const postexpense = require('./routes/postexpense')
const getexpense = require('./routes/getexpense')
const deleteexpense = require('./routes/deleteexpense');
const purchasepremium = require('./routes/purchasepremium');
const updatepremium = require('./routes/updatepremium');
const getleaderboard = require('./routes/getleaderboard');


const app = express();

const user = db.user;
const expense = db.expense;
const order = db.order;
user.hasMany(expense);
expense.belongsTo(user);
user.hasMany(order)
order.belongsTo(user);

app.use(cors());
app.use(express.json());

db.sequelize.sync();

app.post('/login',login)
app.post('/signup',signup)
app.get('/varifypremium',authPremium ,(req,res)=>{
return res.json({success:true ,isPremiumUser:true});
})

app.post('/expense',auth,postexpense)
app.get('/expense',auth,getexpense)
app.delete('/expense/:id',auth,deleteexpense)
app.get('/purchasepremium', auth , purchasepremium)
app.post('/purchasepremium/updatestatus', auth , updatepremium)
app.get('/leaderboard', authPremium, getleaderboard);



app.listen(5000)