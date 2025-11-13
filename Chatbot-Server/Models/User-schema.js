const mongoose  = require('mongoose');
const UserSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true,
        enum:"user"
    },
    name:{
        type:String,
        required:true,
        },
    email:{
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true,
    }
})
const userSchema = mongoose.model('userSchema',UserSchema);
module.exports = userSchema;