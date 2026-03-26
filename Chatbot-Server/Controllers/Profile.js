// const { get } = require('mongoose');
const User = require('../Models/User-schema');
const AppError = require('../utils/AppError');

const updateProfile = async (req, res) => {
    try {
        const { state, dateOfBirth, income, category, gender, occupation, education, ruralUrban } = req.body;
        const userID = req.user.id;
        // console.log("TOKEN USER:", req.user);
        await User.findByIdAndUpdate(userID, {
            $set: {
                profile: { state, dateOfBirth, income, category, gender, occupation, education, ruralUrban },
                ProfileCompleted: true
            }
        },
            { new: true })
        res.status(200).json({ success: true, message: "Profile updated successfully" });

    }


    catch (error) {
       return next(new AppError(error.message , 500));

    }
};


module.exports = updateProfile