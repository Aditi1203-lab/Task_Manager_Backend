const jwt=require('jsonwebtoken')
const User=require('../models/user')

const auth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','');//used to extract token
        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
         //extracting id and finding user with same id in database
         const user=await User.findOne({
            _id:decode._id,
         })
         if(!user)
         {
            throw new Error('User not found');  
         }
         //if user is verified
         req.user=user; //adding user feild on request part
         req.token=token;
         next();
    }catch(err){
       res.status(401).send({err:err.message})
    }
}
module.exports=auth;