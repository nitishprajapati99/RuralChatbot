const express = require('express');
const router = express.Router();
const FAQ  = require("../Models/faq.js");
const Fuse = require('fuse.js');
const similarity = require('string-similarity');
// const Chatbot = require("../Models/chatbot.js");

router.post("/chat", async (req , resp)=>{
    const { question , lang} = req.body;

  try{
    let faq = await FAQ.findOne({
      $or:[{question:{$regex: question , $options: 'i'}},
      {synonyms:{$regex: question , $options: 'i'}},
      {tags:{$regex: question , $options: 'i'}}
      ]});
    // console.log("Direct Match:", faq);

    // Fuzzy Search using Fuse.js
    if(!faq){
        const allFaqs = await FAQ.find();
        const fuse = new Fuse(allFaqs , {
            keys:['question','synonyms','tags'],
            threshold:0.4
        })
        const result  = fuse.search(question);
        if(result.length>0){
            faq = result[0].item;
        }
           
    }

    //if no match found
if(!faq){
  const allFaqs = await FAQ.find({});
  const questions = allFaqs.map(f => f.question);
  const matchedFaqs = similarity.findBestMatch(question,questions)
//  console.log("Best Match:", matchedFaqs.bestMatch);
  if( matchedFaqs.bestMatch.rating > 0.2){
    const suggestedFaq = matchedFaqs.ratings.filter(r=> r.rating > 0.2).map(r=> r.target);
    // console.log("Suggested FAQ:", suggestedFaq);
    return resp.json({
      answer:lang==="en"? " I don’t know this yet. Did you mean one of these?":"मुझे अभी तक यह नहीं पता। क्या आपका मतलब इनमें से किसी एक से था?",
        suggestedFaq
  })
}
}
// 3. If no similar found
     if(faq){
     resp.json({ answer: faq.answers[lang] || faq.answers.en });
    }else {
      return resp.json({
        answer:
          lang === "hi"
            ? "माफ़ , करें मुझे इसका उत्तर नहीं पता।"
            : "Sorry, I don’t know the answer."
      });
    }
}
catch(err){
    resp.status(500).json({ error: err.message });
}
})


module.exports = router;