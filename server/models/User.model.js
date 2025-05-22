const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  ffusername: {type: String, default: "", required: false},
  uid: { type: String, required: true, unique: true },      // was Number
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, default: "user", }
}, { strict: false, timestamps: true });

module.exports = mongoose.model('user', UserSchema);
