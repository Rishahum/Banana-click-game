const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
  },
  clickCount: { 
    type: Number,
    default: 0 
  },
  isBlocked: {
    type: Boolean,
    default: false 
  },
});

module.exports = mongoose.model('Users', UserSchema);