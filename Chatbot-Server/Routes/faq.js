const express = require("express");
const router = express.Router();
const FAQPost = require("../Controllers/question-post");
const AdminVerify = require("../Middlewares/AdminToken");

// Add new FAQ
router.post("/add", AdminVerify,FAQPost);

module.exports = router;
