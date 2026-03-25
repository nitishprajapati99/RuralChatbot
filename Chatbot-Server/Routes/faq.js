const express = require("express");
const router = express.Router();
const FAQPost = require("../Controllers/question-post");
const verifyToken = require('../Middlewares/token.js');
const AdminOnly = require("../Middlewares/AdminOnly.js");

// Add new FAQ
router.post("/add",verifyToken, AdminOnly,FAQPost);

module.exports = router;
