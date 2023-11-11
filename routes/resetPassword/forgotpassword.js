const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const { v4 } = require('uuid');
const Users = require('../../database/users')
const Forgotpassword = require('../../database/forgotPassword');


module.exports = async (req, res) => {
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.SENDINBLUE_KEY;
 
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  try {
    const { email } = req.body;
    const user = await Users.findOne({email:userEmail});

    if (user) {
      const Token = v4()
     const ftpass = new Forgotpassword({id:Token, isactive:true,userEmail:email});
       await ftpass.save();
      const response = await tranEmailApi.sendTransacEmail({
        sender: { email: "mpatel41234@gmail.com", name: "Milan Patel" },
        to: [{ email: email }],
        subject: "Reset your password",
        textContent: `http://localhost:5000/resetpassword/${Token}`,
      });
      if (response) {
        return res.send({ message: "Forgot password link send to your email" });
      } else {
        throw new Error(response.error);
      }
    }
    return res
      .status(404)
      .send({ message: "This email doesn't exists", login: false });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Some error occured, Please try after some time.",
    });
  }
};
