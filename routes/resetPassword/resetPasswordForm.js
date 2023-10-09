
module.exports = (req, res) => {
    const token = req.params.token;
res.render('resetPassword',{token})
};
