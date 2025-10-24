const express = require('express');
const Router = express.Router();
const {Signup , Login} = require('../Controllers/userController');

//Signup the user
Router.post('/signup',Signup);

//Login the user
Router.post('/login',Login);
module.exports = Router;