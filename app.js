//connect to database
require('./database/connection')
require('./public/javascript/userAccounts')
require('./public/javascript/errors')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();


const publicDirectory = path.join(__dirname, './public')

console.log(__dirname)
app.use(express.static(publicDirectory))

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//opening server and opening listening channel
app.listen(8081, function() {});

module.exports = app;
