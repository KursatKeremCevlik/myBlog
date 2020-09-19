const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
// const URL = 'mongodb+srv://ownerUser:12345@cluster0.zqmnm.mongodb.net/blog';
const URL = 'mongodb://localhost/myBlog';
const mongoDB = require('./helper/db')(URL);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sheets/htmls/homePage.html');
});
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/sheets/htmls/adminPage.html');
});
app.use('/css/homePage', express.static(path.join(__dirname, '/sheets/css/homePage.css')));
app.use('/js/homePage', express.static(path.join(__dirname, '/sheets/js/homePage.js')));

app.use('/css/adminPage', express.static(path.join(__dirname, '/sheets/css/adminPage.css')));
app.use('/js/adminPage', express.static(path.join(__dirname, '/sheets/js/adminPage.js')));



const expressOprt = require('./operations/expressOprt')(app, express, logger, cookieParser, path);

const Errors = require('./operations/errors')(app, createError);

module.exports = app;
