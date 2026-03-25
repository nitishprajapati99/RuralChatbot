const FAQ = require("../Models/faq");
const AppError = require("../utils/AppError");

const FAQPost = async (req, res) => {
    const {
        schemeName, description, ministry, category, eligibility, benefits, tags,
        requiredDocuments,
        applyLink } = req.body;
    // console.log("Request Body:", req.body);
    try {
        if (Array.isArray(req.body)) {
            // Case: Multiple FAQs
            await FAQ.insertMany(req.body);
            return res.json({ message: "Multiple FAQs Added ✅" });
        }

        // Case: Single FAQ
        const newFaq = new FAQ({

            schemeName: {
                en: schemeName?.en,
                hi: schemeName?.hi
            },
            description: {
                en: description?.en,
                hi: description?.hi
            }, tags: tags || [],
            ministry: ministry, category: category || [],
            eligibility: {
                state: eligibility?.state || "",
                minAge: eligibility?.minAge || 0,
                maxAge: eligibility?.maxAge || 0,
                maxIncome: eligibility?.maxIncome || 0,
                category: eligibility?.category || [],
            },
            benefits: {
                en: benefits?.en || "",
                hi: benefits?.hi || ""
            },
            state: eligibility?.state || "",

            requiredDocuments: requiredDocuments || [],
            applyLink: applyLink || ""
        });
        // console.log("Received FAQ:", newFaq);
        await FAQ.create(newFaq);
        res.json({ message: "FAQ Added ✅" });
    } catch (err) {
        return next(new AppError(err.message, 500));
    }
};

module.exports = FAQPost;