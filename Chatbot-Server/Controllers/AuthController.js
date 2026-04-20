const UserSchema = require('../Models/User-schema.js')
const Admin = require("../Models/Admin-schema.js");
const AppError = require('../utils/AppError.js');
//Improting the UserService class into the controller
const userService = require('../Service/UserService.js');
const UserService = userService;
//Importing the Token class
const TokenService = require('../Service/TokenService.js');
const userSchema = require('../Models/User-schema.js');
// const TokenService = require('../Service/TokenService.js');
const tokenService = TokenService;


//This function is to Register the user 
const Signup = async (req, res, next) => {
    try {
        const { name, email, password} = req.body;
        //creating the user data
        const UserData = ({ name: name, email: email, password: password, role: "user" });
        //User Service class used email search method
        const UserExist = await UserService.findByEmail(UserSchema, email);
        if (UserExist) return next(new AppError("User already exists", 400));
        //User Service class used create user method
        const User = await UserService.createUser(UserSchema,UserData);
        //send the response if the user is created
        if (User) { return res.status(201).json({ message: "User Resgistered Successfully", success: true }) }
    }
    catch (err) {
        return next(new AppError(err.message, 500));
    }

}

const Login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        console.log(req.body);
        //choosing model for searching
        const model = (role === "user") ? UserSchema : Admin;
        //UserService class for searching the userby email
        const user = await UserService.findByEmail(model, email);
        if (!user) return next(new AppError("User not found", 404));

        //password comparison
        const TrueUser = await UserService.verifyPassword(password, user.password);
        if (!TrueUser) return next(new AppError('Invalid password', 401));

        //Json Token
        const token = TokenService.tokenGenerator(user._id, user.role);

        //Sending Response 
        res.status(200).json({
            message: "user is loggedIn Successfully",
            user: {
                "id": user._id, "name": user.name,
                "email": user.email,
                "role": user.role,
            }, token
        });

    }
    catch (err) {
        return next(new AppError(err.message, 500));
    }
}

module.exports = { Signup, Login };