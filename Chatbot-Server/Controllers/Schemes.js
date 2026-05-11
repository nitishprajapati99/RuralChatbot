const User = require('../Models/User-schema');
const faq = require('../Models/faq.js');
const AppError = require('../utils/AppError.js');
const getRelatedSchemes = async (req, res, next) => {
    try {
        // edge case for unauthenticated users, return general schemes without personalization for guests useers
        if (!req.user) {
            const schemes = await faq.find().limit(10).lean().select('schemeName ministry category eligibility.maxIncome documentRequired applyLink').lean();
            return res.status(200).json({ schemes });
        }

        const user = await User.findById(req.user.id);
        // console.log("USER DATA:", user.profile.state);
        if (!user) { return next(new AppError("User not found", 404)); };
        let schemes;
        if (user.profile.dateOfBirth && user.profile.income && user.profile.state && user.profile.category) {
            // console.log("USER profile:", user.profile);


            const today = new Date();
            const birthDate = new Date(user.profile.dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();

            // Adjust age if birthday hasn't happened yet this year
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            // console.log("USER AGE:", age);
            // console.log("USER PROFILE:", user.profile);
            // Personalized filtering
            //pagination 
            //    const page = parseInt(req.query.params);
            //    const limit = parseInt(req.query.params);
            //    const skip = (page-1) *limit;
            //    console.log(page , skip , limit);
            schemes = await faq.aggregate([
                {
                    $match: {
                        "eligibility.state": { $in: [user.profile.state, "All"] },
                        "eligibility.category": { $in: [user.profile.category, "All"] },
                        "eligibility.gender": { $in: [user.profile.gender, "All"] },
  
                        "eligibility.minAge": { $lte: age },
                        "eligibility.maxAge": { $gte: age },
                        "eligibility.maxIncome": { $gte: user.profile.income }
                    }
                },
                {
                    $addFields: {
                        isEligible: {

                            $and: [
                                { $lte: ["$eligibility.minAge", age] },
                                { $gte: ["$eligibility.maxAge", age] },
                                { $gte: ["$eligibility.maxIncome", user.profile.income] }

                                ,
                                {
                                    $or: [
                                        // If the scheme says "All", everyone is eligible regardless of job
                                        { $eq: ["$eligibility.occupation", ["All"]] },
                                        { $in: ["$eligibility.occupation", user.profile.occupation] },
                                        // Handle cases where the database stores "All" as a single string instead of array
                                        { $eq: ["$eligibility.occupation", "All"] }
                                    ]

                                }
                            ]
                        }
                    }
                },
                // {
                //     $sort: { isEligible: -1, schemeName: 1 }
                // },
                {

                    $project: {
                        schemeName: 1,
                        "description.en": 1,
                        isEligible: 1,
                        ministry: 1,
                        category: 1,
                        documentRequired: 1,
                        applyLink: 1,
                        "eligibility.maxIncome": 1,
                        "eligibility.minAge": 1,
                        "eligibility.maxAge": 1,
                    }
                }
            ])
            // {
            //     "eligibility.state": { $in: [user.profile.state, "All"] },
            //     "eligibility.category": { $in: [user.profile.category, "All"] },
            //     "eligibility.minAge": { $lte: age },
            //     "eligibility.maxAge": { $gte: age },
            //     "eligibility.maxIncome": { $gte: user.profile.income },
            //     "eligibility.gender": { $in: [user.profile.gender, "All"] },
            //     "eligibility.occupation": { $in: [...user.profile.occupation, "All"] }
            // }
            // .lean().select('schemeName ministry category eligibility.maxIncome documentRequired applyLink')

            // console.log("FILTERED SCHEMES:", schemes);
            console.time("Filtering Time");
            console.log("Filtered SCHEMES:", schemes);
            res.status(200).json({ schemes });
            console.timeEnd("Filtering Time");
        } else {
            // General schemes (no profile)
            schemes = await faq.find().limit(10).lean().select('schemeName ministry category eligibility.maxIncome documentRequired applyLink').lean();
            // console.log("General SCHEMES:", schemes);
            console.time("General Fetch Time");
            res.status(200).json({ schemes });
            console.timeEnd("General Fetch Time");
        }
    } catch (err) {
        return next(new AppError(err.message, 500));
    }
}

module.exports = getRelatedSchemes;       