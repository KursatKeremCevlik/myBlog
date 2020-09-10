const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
    title: String,
    content: String,
    date: String
});

module.exports = mongoose.model('Blog', Blog);