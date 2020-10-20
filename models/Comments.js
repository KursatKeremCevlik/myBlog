const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    comment: String,
    secretID: Number
});

module.exports = mongoose.model('Comment', Comment);