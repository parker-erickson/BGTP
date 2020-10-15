//connect to database
require('./database/connection')
require('./public/javascript/userAccounts')
require('./public/javascript/errors')


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/pages/login');
const cartRouter = require('./routes/cart');
const productsRouter = require('./routes/products');
const profileRouter = require('./routes/profile');
const postRouter = require('./routes/post');
const registerRouter = require('./routes/register');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ADDED-----------
app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/post', postRouter);
app.use('/products',productsRouter);
app.use('/register',registerRouter);
app.use('/profile',profileRouter);



//Console output
app.listen(process.env.PORT, function() {
  console.log("Express server is running...");
});

//port wiring
//opening server and opening listening channel
app.listen(8081, function() {
  //opens server on port 3000, does stuff
});

module.exports = app.js;