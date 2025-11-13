const Admin = require('../Models/Admin-schema');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//signup controller
const Signup = async(req,res)=>{
    try{
    const{name , email , password ,role} = req.body;
    const admin = await Admin.findOne({email});
    if(admin) return res.status(401).json({message:"Admin is already exists"});
    //password hassing
    const saltValue = 6;
    const hashedPassword = await bcrypt.hash(password,saltValue);
    
    const newAdmin = new Admin({name:name , email:email , password:hashedPassword , role:role});
    await Admin.create(newAdmin);
     return res.status(201).json({message:"Admin Created successfully"});
    }catch(err){
        res.status(500).json({message:"Internal Server Error" , Error:err.message});
    }
}

//Login controller
const Login = async(req , res) =>{
    const{email , password , role} = req.body;
    const admin = await Admin.findOne({email});
    if(!admin) return res.status(404).json({message:"User is not found"});
    //compare the password with hashed password
    const trueAdmin = await bcrypt.compare(password , admin.password);
    if(!trueAdmin) return res.status(400).json({message:"Invalid Credential"});
    
    //Json web token Authentication
    const secretKey = process.env.AdminSecretKey;
    const adminToken = await Jwt.sign({email} , secretKey , {expiresIn : "1h"});
     
    //response
    res.status(200).json({message:"Admin is LoggedIn Successfully" , Token:adminToken});
}

module.exports = {Signup , Login};