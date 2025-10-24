const express = require('express');
const Cors = require('cors');
require('dotenv').config();
const ConnectDB = require( './DB/MongoDb.js');


//Mongoose Connection
ConnectDB();

const app = express();
app.use(express.json());
app.use(Cors());
//Admin Routes 
const AdminRoutes = require('./Routes/AdminRoutes.js');
app.use('/api/v1/admin',AdminRoutes);
//UserRoutes
const usersRoute = require('./Routes/usersRoute.js');
app.use('/api/v1/users',usersRoute);
// app.use("/chatbot", chatbotRoutes);
const chatbotRoutes = require( './Routes/chatbot.js');
app.use("/chatbot", chatbotRoutes);
//FAQ Routes
const faqRoutes = require( './Routes/faq.js');
app.use("/faq", faqRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("The current port is running on the "+ PORT));