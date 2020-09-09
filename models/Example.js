const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Example = new Schema({
    name: String,
    surname: String,
});

module.exports = mongoose.model('example', Example);