const express = require('express');
const Cors = require('cors');
require('dotenv').config();
const ConnectDB = require( './DB/MongoDb.js');


//Mongoose Connection
ConnectDB();

const app = express();
app.use(express.json());
app.use(Cors());
// app.use("/chatbot", chatbotRoutes);
const chatbotRoutes = require( './Routes/chatbot.js');
app.use("/chatbot", chatbotRoutes);
//FAQ Routes
const faqRoutes = require( './Routes/faq.js');
app.use("/faq", faqRoutes);
app.get('/',(req ,resp)=>{
    resp.send('Rural Chatbot Backend Running ');
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("The current port is running on the "+PORT));