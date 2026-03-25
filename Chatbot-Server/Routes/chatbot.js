const express = require('express');
const router = express.Router();
const verifyToken = require('../Middlewares/token.js');
const {tieredLimiter} = require('../Middlewares/RateLimiter.js');

const chatbar = require('../Controllers/chat-bar.js');
// const Chatbot = require("../Models/chatbot.js");

router.post("/chat" ,verifyToken ,tieredLimiter,chatbar)


module.exports = router;