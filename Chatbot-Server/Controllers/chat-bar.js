const FAQ  = require("../Models/faq.js");
const Fuse = require('fuse.js');
const similarity = require('string-similarity');
<<<<<<< HEAD
const AppError = require("../utils/AppError");

const chatbar = async (req, res , next) => {
  const { question, lang } = req.body;
// console.log("Received question:", question, "Language:", lang);
  if (!question) {
    return next(new AppError("Question is required" , 400));
=======
const chatbar = async (req, res) => {
  const { question, lang } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
>>>>>>> c76eb25f88df4969f2a67a50e8292ac0c526b4ea
  }

  try {
    let faq = await FAQ.findOne({
      $or: [
<<<<<<< HEAD
        { "schemeName.en": { $regex: question, $options: "i" } },
        { "schemeName.hi": { $regex: question, $options: "i" } },
        { category: { $regex: question, $options: "i" } },
        { tags: { $regex: question, $options: "i" } }
      ]
    }).lean();
    // console.log("Initial FAQ search result:", faq);

    if (!faq) {
      const allFaqs = await FAQ.find().lean();
    //  console.log("Total FAQs fetched for fuzzy search:", allFaqs.length);
      const fuse = new Fuse(allFaqs, {
        keys: ["schemeName.en", "schemeName.hi", "category", "tags"],
=======
        { question: { $regex: question, $options: "i" } },
        { synonyms: { $regex: question, $options: "i" } },
        { tags: { $regex: question, $options: "i" } }
      ]
    });

    if (!faq) {
      const allFaqs = await FAQ.find();

      const fuse = new Fuse(allFaqs, {
        keys: ["question", "synonyms", "tags"],
>>>>>>> c76eb25f88df4969f2a67a50e8292ac0c526b4ea
        threshold: 0.4
      });

      const result = fuse.search(question);
<<<<<<< HEAD
// console.log("Fuzzy search results:", result);
=======

>>>>>>> c76eb25f88df4969f2a67a50e8292ac0c526b4ea
      if (result.length > 0) {
        faq = result[0].item;
      }

      // Similarity check
      if (!faq) {
<<<<<<< HEAD
        const Schemes = allFaqs.map(f => f.schemeName);
        const matchedFaqs = similarity.findBestMatch(question, Schemes.map);

        if (matchedFaqs.bestMatch.rating > 0.4) {
          const suggestedFaq = matchedFaqs.ratings
            .filter(r => r.rating > 0.4)
=======
        const questions = allFaqs.map(f => f.question);
        const matchedFaqs = similarity.findBestMatch(question, questions);

        if (matchedFaqs.bestMatch.rating > 0.2) {
          const suggestedFaq = matchedFaqs.ratings
            .filter(r => r.rating > 0.2)
>>>>>>> c76eb25f88df4969f2a67a50e8292ac0c526b4ea
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
<<<<<<< HEAD
      // console.log("FAQ found:", faq);
      return res.json({
        answer: { description: faq.description[lang], requiredDocuments: faq.requiredDocuments,
          eligibilityCriteria: faq.eligibility, benefits: faq.benefits ,applyLink: faq.applyLink,
          category: faq.category, ministry: faq.ministry
         }
        
        || faq.description.en
=======
      return res.json({
        answer: faq.answers[lang] || faq.answers.en
>>>>>>> c76eb25f88df4969f2a67a50e8292ac0c526b4ea
      });
    }

    return res.json({
<<<<<<< HEAD
      answer:"Not found"
        // lang === "hi"
        //   ? "माफ़ करें, मुझे इसका उत्तर नहीं पता।"
        //   : "Sorry, I don’t know the answer."
    });

  } catch (err) {
    return next(new AppError(err.message, 500));
=======
      answer:
        lang === "hi"
          ? "माफ़ करें, मुझे इसका उत्तर नहीं पता।"
          : "Sorry, I don’t know the answer."
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
>>>>>>> c76eb25f88df4969f2a67a50e8292ac0c526b4ea
  }
};


module.exports = chatbar;
