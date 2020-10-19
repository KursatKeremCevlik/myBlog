const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    name: String,
    surname: String,
    username: String,
    password: String
});

module.exports = mongoose.model('Admin', Admin);