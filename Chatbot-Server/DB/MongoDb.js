const mongoose = require('mongoose');
// require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

console.log("Mongo URI: ", mongoURI);
const ConnectDB = async()=>{
await mongoose.connect(mongoURI )
.then(()=>console.log("Database is Connected "))
.catch((err)=>console.log("error in database"+err));
};

module.exports = ConnectDB;