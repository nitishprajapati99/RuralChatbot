const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
class TokenService{
    constructor(secretKey){
        this.SecretKey = secretKey;
    }

     tokenGenerator(id,role){
   const token =  JWT.sign({id:id,role:role},this.SecretKey,{expiresIn:"10h"});
   return token;
    }
     TokenVerfier(token){
         return(token)?JWT.verify(token , this.SecretKey):null;
    }
    
}

module.exports =  new TokenService(process.env.SECRET_KEY)