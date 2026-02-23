const FAQ  = require("../Models/faq.js");
const Fuse = require('fuse.js');
const similarity = require('string-similarity');
const chatbar = async (req, res) => {
  const { question, lang } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    let faq = await FAQ.findOne({
      $or: [
        { question: { $regex: question, $options: "i" } },
        { synonyms: { $regex: question, $options: "i" } },
        { tags: { $regex: question, $options: "i" } }
      ]
    });

    if (!faq) {
      const allFaqs = await FAQ.find();

      const fuse = new Fuse(allFaqs, {
        keys: ["question", "synonyms", "tags"],
        threshold: 0.4
      });

      const result = fuse.search(question);

      if (result.length > 0) {
        faq = result[0].item;
      }

      // Similarity check
      if (!faq) {
        const questions = allFaqs.map(f => f.question);
        const matchedFaqs = similarity.findBestMatch(question, questions);

        if (matchedFaqs.bestMatch.rating > 0.2) {
          const suggestedFaq = matchedFaqs.ratings
            .filter(r => r.rating > 0.2)
            .map(r => r.target);

          return res.json({
            answer:
              lang === "en"
                ? "I don’t know this yet. Did you mean one of these?"
                : "मुझे अभी तक यह नहीं पता। क्या आपका मतलब इनमें से किसी एक से था?",
            suggestedFaq
          });
        }
      }
    }

    if (faq) {
      return res.json({
        answer: faq.answers[lang] || faq.answers.en
      });
    }

    return res.json({
      answer:
        lang === "hi"
          ? "माफ़ करें, मुझे इसका उत्तर नहीं पता।"
          : "Sorry, I don’t know the answer."
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


module.exports = chatbar;
