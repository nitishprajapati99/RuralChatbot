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
    occupation: [String]
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
    "eligibility.category": 1,
    "eligibility.gender": 1,
    "eligibility.state": 1,
    "eligibility.maxIncome": 1,
    "eligibility.minAge": 1,
    "eligibility.maxAge": 1
});
// 2. Separate Index for Occupation (Since it's a second array)
faqSchema.index({ "eligibility.occupation": 1 });

module.exports = mongoose.model("FAQ", faqSchema);
