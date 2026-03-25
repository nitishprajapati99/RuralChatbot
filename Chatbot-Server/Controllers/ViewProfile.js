const User = require('../Models/User-schema.js');
const Admin = require('../Models/Admin-schema.js');
const AppError = require('../utils/AppError');


const ViewProfile = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            const user = await Admin.findById(req.user.id);
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new AppError('User not found', 404))
        }
        res.status(200).json({
            status: 'success',
            data: {
                name: user.name, email: user.email,
                profile: user.profile
            }
        })

    }
    catch (err) {
        return next(new AppError(err.message, 500))
    }
}

//module exproting
module.exports = ViewProfile