const express = require('express');
const Router = express.Router();
const {Signup , Login} = require('../Controllers/userController');
const {authLimiter} = require('../Middlewares/RateLimiter');

//Signup the user
Router.post('/signup',authLimiter,Signup);

//Login the user
Router.post('/login',authLimiter,Login);
module.exports = Router;