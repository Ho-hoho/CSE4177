const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  clothing: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;