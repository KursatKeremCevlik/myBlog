const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ROUTES = require('./routes/index');
const app = express();

// DB Connection
const URL = 'mongodb://localhost/myBlog';
const mongoDB = require('./helper/db')(URL);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Route setting
app.use('/', ROUTES);
// Express Operations
const expressOprt = require('./operations.js/expressOprt')(app, express, logger, cookieParser, path);
// Errors
const Errors = require('./operations.js/errors')(app, createError);

module.exports = app;
