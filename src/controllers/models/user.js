const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    role: {type: String, enum: ['task', 'cammer', 'client', 'provider'], required: true}
});

const User = mongoose.model('User', userSchema);
module.exports = User;