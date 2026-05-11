// const { get } = require('mongoose');
const User = require('../Models/User-schema');
const AppError = require('../utils/AppError');
const UserService = require('../Service/UserService');
// const UserService =  userService();


const updateProfile = async (req, res) => {
    try {
        const userID = req.user.id;
        // console.log(userID) ;
         // Destructure the flat data from req.body
        const { state, dateOfBirth, income, category, gender, occupation, education, ruralUrban } = req.body;

        // Structure it to match your schema's 'profile' field
        const updateData = {
            profile: {
                state,
                dateOfBirth,
                income,
                category,
                gender,
                occupation, // If your schema expects an array, use [occupation]
                education,
                ruralUrban
            },
            ProfileCompleted: true // Mark profile as finished
        };

        const updatedUser = await UserService.ProfileUpdate(User, userID, updateData);

        // console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = updateProfile