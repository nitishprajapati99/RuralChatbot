const express = require('express');
const Router = express.Router();
const {Signup , Login} = require('../Controllers/AdminController');
//Signup Router
Router.post('/signup',Signup);

//Login Router
Router.post('/login',Login );


//exporting module
module.exports = Router;