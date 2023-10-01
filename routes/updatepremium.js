const db = require('../database/db');
const user = db.user;
const order = db.order;

module.exports = async(req,res)=>{
    const userEmail = req.user;
try {
  const userResponse = await user.update({ispremium:true},{
    where:{email:userEmail},
   });
   const orderResponse = await order.update({status:"success", paymentid:req.body.payment_id},{
    where:{orderid:req.body.order_id}
   })

if(userResponse.error) throw new Error(userResponse.error)
if(orderResponse.error) throw new Error(orderResponse.error)
   return res.json({message:"transaction successful"}) 
} catch (error) {
    console.log(error)
    res.status(500).send(error)
}
}