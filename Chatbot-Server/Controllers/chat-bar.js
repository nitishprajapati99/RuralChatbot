const FAQ  = require("../Models/faq.js");
const Fuse = require('fuse.js');
const similarity = require('string-similarity');
const AppError = require("../utils/AppError");

const chatbar = async (req, res) => {
  const { question, lang } = req.body;
// console.log("Received question:", question, "Language:", lang);
  if (!question) {
    return next(new AppError("Question is required" , 400));
  }

  try {
    let faq = await FAQ.findOne({
      $or: [
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
        threshold: 0.4
      });

      const result = fuse.search(question);
// console.log("Fuzzy search results:", result);
      if (result.length > 0) {
        faq = result[0].item;
      }

      // Similarity check
      if (!faq) {
        const Schemes = allFaqs.map(f => f.schemeName);
        const matchedFaqs = similarity.findBestMatch(question, Schemes.map);

        if (matchedFaqs.bestMatch.rating > 0.4) {
          const suggestedFaq = matchedFaqs.ratings
            .filter(r => r.rating > 0.4)
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
      // console.log("FAQ found:", faq);
      return res.json({
        answer: { description: faq.description[lang], requiredDocuments: faq.requiredDocuments,
          eligibilityCriteria: faq.eligibility, benefits: faq.benefits ,applyLink: faq.applyLink,
          category: faq.category, ministry: faq.ministry
         }
        
        || faq.description.en
      });
    }

    return res.json({
      answer:"Not found"
        // lang === "hi"
        //   ? "माफ़ करें, मुझे इसका उत्तर नहीं पता।"
        //   : "Sorry, I don’t know the answer."
    });

  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};


module.exports = chatbar;

