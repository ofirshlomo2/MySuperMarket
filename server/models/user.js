const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    userId: Number,
    city: String,
    street: String,
    fullName: String,
    role:{
        type: String,
        enum : ['user','admin'],
        default: 'user'
    }
});

module.exports = mongoose.model('User', UserSchema);
