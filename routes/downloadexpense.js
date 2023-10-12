const AWS = require('aws-sdk');
const {expense , fileurl} = require('../database/db');

function uploadToS3(data , filename){
const BUCKET_NAME = 'india-access-u4wmj1w149x46owx6gkbgjopqaqt6aps3a-s3alias';
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
let S3bucket = new AWS.S3({
    accessKeyId:IAM_USER_KEY,
    secretAccessKey:IAM_USER_SECRET
})
let params = {
    Bucket: BUCKET_NAME,
    Key:filename,
    Body: data,
    ACL: 'public-read'
}
return new Promise((resolve, reject) => {
S3bucket.upload(params,(error , s3response)=>{
    if(error) reject(error)
    else resolve(s3response)
})
})
}

module.exports = async(req,res)=>{
    try {  
        const user = req.user;
        const userExpenses = await expense.findAll({
            where:{userEmail:user.email},
            attributes:['date','amount','category','details']
        })
        const stringifiedExpenses = JSON.stringify(userExpenses);
        const filename = `${user.email}${new Date()}.txt`;
        const fileURL = await uploadToS3(stringifiedExpenses, filename);
        if(fileURL.error)throw new Error(fileURL.error); 
        const addUrlToDatabase = await fileurl.create({ url: fileURL.Location})
        if(addUrlToDatabase.error)throw new Error(addUrlToDatabase.error);
            return res.json({fileURL:fileURL.Location,success:true})
    } catch (error) {
        console.log(error);
       res.status(500).send({error:error , success:false}); 
    }
    }