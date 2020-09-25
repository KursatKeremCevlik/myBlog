const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    username: String,
    message: String
});

module.exports = mongoose.model('Message', Message);