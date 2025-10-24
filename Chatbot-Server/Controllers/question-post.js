const FAQ = require("../Models/faq");
const FAQPost = async (req, res) => {
    const { question, en, hi, synonyms, tags } = req.body;
    // console.log("Request Body:", req.body);
    try {
        if (Array.isArray(req.body)) {
            // Case: Multiple FAQs
            await FAQ.insertMany(req.body);
            return res.json({ message: "Multiple FAQs Added ✅" });
        }

        // Case: Single FAQ
        const newFaq = new FAQ({

            question,
            answers: { en: en, hi: hi }, synonyms: synonyms || [], tags: tags || []
        });
        // console.log("Received FAQ:", newFaq);
        await FAQ.create(newFaq);
        res.json({ message: "FAQ Added ✅" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = FAQPost;