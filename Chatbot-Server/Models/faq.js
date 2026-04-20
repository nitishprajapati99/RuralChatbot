const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
 schemeName: {
    en: String,
    hi: String
  },
  description: {
    en: String,
    hi: String
  },

  category: [String],
  ministry: String,
  eligibility: {
    state: String,
    minAge: Number,
    maxAge: Number,
    maxIncome: Number,
    category: [String],
    gender: String,
    occupation: [String],
    education: [String]
  },
   benefits: {
    en: String,
    hi: String
  },

  tags: [String],
  
  requiredDocuments: [String],
  applyLink: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
});
faqSchema.index({
    "eligibility.state": 1,
    "eligibility.category": 1,
    "eligibility.gender": 1
});
// 2. Separate Index for Occupation (Since it's a second array)
faqSchema.index({ 
    schemeName: "text", 
    tags: "text", 
    "description.en": "text" 
}, {
    weights: {
        schemeName: 10, // Make matches in the Name more important
        tags: 5
    },
    name: "ChatbotSearchIndex"
});


module.exports = mongoose.model("FAQ", faqSchema);
