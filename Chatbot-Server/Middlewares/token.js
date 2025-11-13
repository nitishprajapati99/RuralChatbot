const Jwt = require('jsonwebtoken');

const verifyToken = async(req , res ,next)=>{
    try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(401).json({meassage:"Access denied. No authorized access",success:false})
    }
    const token = authHeader.split(' ')[1];//extract token part from the Authorization inside header
    const decode = Jwt.verify(token , process.env.SECRET_KEY);
    req.user = decode;
    
    // Proceed to next middleware or controller
    next();
}catch(err){
    if(err.name=="TokenExpiredError"){
        return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' })
    }
    if(err.name=="JsonwebTokenError"){
        return res.status(403).json({ success: false, message: 'Invalid token.' })
    }
}


}

module.exports = verifyToken;