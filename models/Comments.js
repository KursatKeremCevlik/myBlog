const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    comment: String
});

module.exports = mongoose.model('Comment', Comment);