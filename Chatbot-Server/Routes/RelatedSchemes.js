const express = require('express');
const router = express.Router();
const  getRelatedSchemes  = require('../Controllers/Schemes');
const userToken   = require('../Middlewares/token');
const { tieredLimiter } = require('../Middlewares/RateLimiter');


router.get('/related-schemes', userToken ,tieredLimiter , getRelatedSchemes);


module.exports = router;