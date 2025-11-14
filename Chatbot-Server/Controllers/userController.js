
const userSchema = require('../Models/User-schema');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


//This function is to Register the user 
const Signup = async(req,res)=>{
    try{
    const {name,email,password ,role} = req.body;
    const UserExist = await userSchema.findOne({email:email});
    if (UserExist) return res.status(401).json({message:"User is already exist"});
 //password hasing using bcrypt
    const saltValue = 5;
    const hashedPassword = await bcrypt.hash(password,saltValue);
    const NewUser = new userSchema({name:name,email:email,password:hashedPassword , role:role});
    await userSchema.create(NewUser);
    res.status(201).json({message:"User Registerd successfully"});
    }
    catch(err){
        res.status(500).json({message:"Internal Server error",error:err.message});
    }
    
}

const Login = async(req,res)=>{
    try{
    const{email,password,role} = req.body;
    const user = await userSchema.findOne({email});
    if(!user) return res.status(404).json({message:"User is not found"});
    
    //password comparison
    const TrueUser = await bcrypt.compare(password , user.password);


    if(!TrueUser) return res.status(400).json({message:"Invalid Credential"});

    //Json Token
    const secret_Key = process.env.SECRET_KEY;
    const token = Jwt.sign({email},secret_Key,{expiresIn:"1h"});
    
    
    res.status(200).json({message:"user is loggedIn Successfully" , Token:token});
    }
    catch(err){
        res.status(500).json({message:"Internal Server Erros",error:err.message});
    }
}

module.exports = {Signup ,Login};