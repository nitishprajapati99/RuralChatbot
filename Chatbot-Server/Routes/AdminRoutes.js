const express = require('express');
const Router = express.Router();
const {Signup , Login} = require('../Controllers/AdminController');
const {authLimiter} = require('../Middlewares/RateLimiter');
//Signup Router
Router.post('/signup',authLimiter,Signup);

//Login Router
Router.post('/login',authLimiter,Login );


//exporting module
module.exports = Router;