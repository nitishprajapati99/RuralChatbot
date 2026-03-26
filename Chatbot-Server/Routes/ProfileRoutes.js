const express = require('express');
const Router = express.Router();
const updateProfile = require('../Controllers/Profile');
const verifyToken = require('../Middlewares/token.js');

//update profile
Router.patch('/profile',verifyToken,updateProfile);

//exporting module
module.exports = Router;    