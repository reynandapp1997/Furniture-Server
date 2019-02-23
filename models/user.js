const mongoose = require('mongoose');

const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    email_verification_status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', user);