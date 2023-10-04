const sequelize = require('sequelize');
const db = require('../database/db');
const user = db.user;
const expense = db.expense;

const getleaderboard = async(req ,res)=>{
    try {
     const leaderboard = await expense.findAll({
        attributes:['userEmail',[sequelize.fn('sum',sequelize.col('expense.amount')),'total']],
        include:[{
            model:user,
            attributes:['name']
        }],
         group:['userEmail'],
         order:[['total','DESC']]
     });
     return res.json(leaderboard);
    } catch (error) {
       return res.status(500).send()
    }
}
module.exports = getleaderboard;