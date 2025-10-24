const Jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const AdminVerify = async(req , res , next) =>{
    try{
    const authHeader = req.headers.authorization;
   if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({message:"Admin is unauthorized" , success:false});
   }
  
 const adminToken = authHeader.split(' ')[1];
   const decode =  Jwt.verify(adminToken ,process.env.AdminSecretKey );
    
   req.admin = decode;
   
// Proceed to next middleware or controller
   next();
}
catch(err){
  if(err.name=="TokenExpiredError"){
    return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' })
  }
  if(err.name=="JsonwebTokenError"){
    return res.status(403).json({success:false , message:"Invalid token."})
  }
}
}

module.exports = AdminVerify;
