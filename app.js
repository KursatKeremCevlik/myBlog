const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const URL = 'mongodb+srv://ownerUser:12345@cluster0.zqmnm.mongodb.net/blog';
// const URL = 'mongodb://localhost/myBlog';
const mongoDB = require('./helper/db')(URL);

app.get('/',(req,res)=>{res.sendFile(__dirname + '/sheets/htmls/homePage.html');});
app.get('/adminPageControl',(req,res)=>{res.sendFile(__dirname + '/sheets/htmls/adminPageControl.html');});
app.get('/adminPage/',(req,res)=>{res.sendFile(__dirname + '/sheets/htmls/adminPage.html');});

app.use('/css/homePage', express.static(path.join(__dirname, '/sheets/css/homePage.css')));
app.use('/css/adminPageControl', express.static(path.join(__dirname, '/sheets/css/adminPageControl.css')));
app.use('/css/adminPage', express.static(path.join(__dirname, '/sheets/css/adminPage.css')));
app.use('/js/homePage', express.static(path.join(__dirname, '/sheets/js/homePage.js')));
app.use('/js/adminPageControl', express.static(path.join(__dirname, '/sheets/js/adminPageControl.js')));
app.use('/js/adminPage', express.static(path.join(__dirname, '/sheets/js/adminPage.js')));

const expressOprt = require('./operations/expressOprt')(app, express, logger, cookieParser, path);
// const Errors = require('./operations/errors')(app, createError);
app.use(function (req, res, next) {
    res.sendFile(__dirname + '/sheets/htmls/errorPage.html');
});

module.exports = app;
