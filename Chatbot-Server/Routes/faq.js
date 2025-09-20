const express = require("express");
const router = express.Router();
const FAQ = require("../Models/faq");

// Add new FAQ
router.post("/add", async (req, res) => {
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
        console.log("Received FAQ:", newFaq);
        await FAQ.save(newFaq);
        res.json({ message: "FAQ Added ✅" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
