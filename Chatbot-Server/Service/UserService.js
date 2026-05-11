const { ClassNames } = require('@emotion/react');
// const UserSchema = require('../Models/User-schema');
// const Admin = require('../Models/Admin-schema');
const PasswordService = require('./passwordService');
//Importing the password class so it encrypt the password
// const password = require('./passwordHashing');
const passwordService = new PasswordService();

//User service class
class userService {
    constructor(passwordService){
        if (!passwordService) {
            throw new Error("UserService: passwordService is required but was not provided!");
        }
        // Check if the provided tool actually has the method we need
        if (typeof passwordService.hashing !== 'function') {
            throw new Error("UserService: The provided passwordService is missing the 'hashing' method!");
        }
        this.passwordService = passwordService;
    }
    //search by id method
    async findById(model , userID){
        return await model.findOne(userID);
    }
    //Email search method
    async findByEmail(model ,email) {
        return  await model.findOne({email}).lean();
         }
    // profile updation service
    // userService.js
async ProfileUpdate(model, userID, userData) {
    // Fixed: used 'userData' (the argument) instead of 'updateData'
    // { new: true } returns the updated document
    return await model.findByIdAndUpdate(
        userID, 
        { $set: userData }, 
        { new: true } 
    );
}

    //User store in the DB
    async createUser(model,userData) {
        //hashing the password using bcrypt
        const hashedPassword = await this.passwordService.hashing(userData.password);
        userData.password = hashedPassword;
        //create the user after password hashed
        const user = await model.create(userData);

        return user;
    }
    async verifyPassword(plainPassword , password){
   return await this.passwordService.compare(plainPassword , password);
}
}

module.exports = new  userService(passwordService)