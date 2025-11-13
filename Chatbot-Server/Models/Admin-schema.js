const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    role: {
        type: String,
        enum: "admin",
        required: true 
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = mongoose.model('Admin', admin);

module.exports = Admin;