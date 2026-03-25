const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: "user"
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    state: String,
    dateOfBirth: Date,
    income: Number,
    category: String,
    gender: String,
    occupation: String,
    education: String,
    ruralUrban: String
  },
  ProfileCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
const userSchema = mongoose.model('userSchema', UserSchema);
module.exports = userSchema;