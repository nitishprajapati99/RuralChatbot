const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question : {
    type:String,
    required:true,
  },

  answers: {
    en:{
    type:String,
    required:true,
  },
    hi: {
    type:String,
    required:true
  }
  },

  tags:[String],
  
  synonyms:[String] 
});

module.exports = mongoose.model("FAQ", faqSchema);
