const express = require('express');
const Cors = require('cors');
require('dotenv').config();
const ConnectDB = require( './DB/MongoDb.js');
const globalErrorHandler = require('./Middlewares/GlobalErrorHandler.js');



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
//Profile Routes
const profileRoutes = require('./Routes/ProfileRoutes.js');
app.use("/v1/user",profileRoutes);
//Related Schemes Routes
const relatedSchemes = require('./Routes/RelatedSchemes.js');
app.use("/v1/schemes",relatedSchemes);

//View Profile Route
const viewProfileRoute = require('./Routes/ViewProfileRoute.js');
app.use("/v1/user",viewProfileRoute);

app.use(globalErrorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("The current port is running on the "+ PORT));