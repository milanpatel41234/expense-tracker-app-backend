const db = require('../database/db');
const user = db.user;
const order = db.order;

module.exports = async(req,res)=>{
    const userEmail = req.user.email;
try {
  const orderResponse = await order.update({status:req.body.status , paymentid:req.body.payment_id},{
    where:{orderid:req.body.order_id}
  })
  if(req.body.status === 'success'){
    const userResponse = await user.update({ispremium:true},{
      where:{email:userEmail},
     });
     if(userResponse.error) throw new Error(userResponse.error)
     else return res.json({message:"transaction successful"})
  }
if(orderResponse.error) throw new Error(orderResponse.error)
   return res.json({message:"transaction failed"}) 
} catch (error) {
    res.status(500).send(error)
}
}