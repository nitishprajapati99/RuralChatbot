const Admin = require('../Models/Admin-schema');
// const bcrypt = require('bcrypt');
// const Jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
const AppError = require('../utils/AppError');
const UserService = require('../Service/UserService');
// dotenv.config();

//signup controller
const Signup = async (req, res , next) => {
    try {
        const { name, email, password } = req.body;
        // console.log(role);
        
        const Data = {name:name,email:email,password:password,role:"admin"}
        const adminUser = await UserService.findByEmail(Admin , email);
        if (adminUser) return next(new AppError("Admin already exists" , 400));
        const admin = await UserService.createUser(Admin , Data)
        return res.status(201).json({ message: "Admin Created successfully" });
    } catch (err) {
        return next(new AppError(err.message, 500));
    }
}

//Login controller
// const Login = async (req, res , next) => {
//     try{
//     const { email, password, role } = req.body;
//     const admin = await Admin.findOne({ email }).lean();
//     if (!admin) return next(new AppError("Admin not found" , 404));
//     //compare the password with hashed password
//     const trueAdmin = await bcrypt.compare(password, admin.password);
//     if (!trueAdmin) return next(new AppError("Invalid Credential" , 400));

//     //Json web token Authentication
//     const secretKey = process.env.SECRET_KEY;
//     const adminToken = await Jwt.sign({ id: admin._id, role: admin.role }, secretKey, { expiresIn: "10h" });

//     //response
//     res.status(200).json({ message: "Admin is LoggedIn Successfully", token: adminToken });
//     }catch(err){
//         return next(new AppError(err.message, 500));
//     }
// }

module.exports = { Signup };