const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question : String,

  answers: {
    en: String,
    hi: String
  },

  tags:[String],
  
  synonyms:[String] 
});

module.exports = mongoose.model("FAQ", faqSchema);
