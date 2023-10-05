const sequelize = require('sequelize');
const db = require('../database/db');
const user = db.user;

const getleaderboard = async(req ,res)=>{
    try {
     const leaderboard = await user.findAll({
        attributes:['email','name','total'],
         order:[['total','DESC']]
     });
     return res.json(leaderboard);
    } catch (error) {
       return res.status(500).send()
    }
}
module.exports = getleaderboard;