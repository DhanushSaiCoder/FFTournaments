const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  uid: { type: String, required: true, unique: true },      // was Number
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },     
  role: {type: String, default: "user",}
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);
