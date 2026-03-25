
const userSchema = require('../Models/User-schema');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const AppError = require('../utils/AppError.js');


//This function is to Register the user 
const Signup = async (req, res , next) => {
    try {
        const { name, email, password, role, profile } = req.body;
        const UserExist = await userSchema.findOne({ email: email }).lean();
        if (UserExist) return next(new AppError("User already exists", 400));
        //password hasing using bcrypt
        const saltValue = 5;
        const hashedPassword = await bcrypt.hash(password, saltValue);
        const NewUser = new userSchema({ name: name, email: email, password: hashedPassword, role: role, profile: profile });
        await userSchema.create(NewUser);
        res.status(201).json({ message: "User Registerd successfully" });
    }
    catch (err) {
       return next(new AppError(err.message, 500));
    }

}

const Login = async (req, res , next) => {
    try {
        const { email, password, role } = req.body;
        const user = await userSchema.findOne({ email }).lean();
        if (!user) return next(new AppError("User not found", 404));

        //password comparison
        const TrueUser = await bcrypt.compare(password, user.password);


        if (!TrueUser) return next(new AppError('Invalid password', 401));

        //Json Token
        if (!process.env.SECRET_KEY) {
            return next(new AppError("SECRET_KEY not defined", 500));
            // throw new Error("SECRET_KEY not defined");
        }
        const token = Jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "10h" });
        // console.log("Generated Token:", token); // Debugging line to check the generated token

        res.status(200).json({
            message: "user is loggedIn Successfully",
            user: {
                "id": user._id, "name": user.name,
                "email": user.email,
                "role": user.role,
            },  token
        });

    }
    catch (err) {
         return next(new AppError(err.message, 500));
    }
}

module.exports = { Signup, Login };