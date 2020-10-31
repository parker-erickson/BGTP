//connect to database
require('./database/connection')
require('./public/javascript/userAccounts')
require('./public/javascript/errors')
<<<<<<< HEAD
=======
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const session = require('express-session');
const forceSsl = require('force-ssl-heroku');
>>>>>>> a78a48b2c02e3a71a8c803d6091ac56fb757bcfb

const app = express();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

<<<<<<< HEAD

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/pages/login');
const cartRouter = require('./routes/cart');
const productsRouter = require('./routes/products');
const profileRouter = require('./routes/profile');
const postRouter = require('./routes/post');
const registerRouter = require('./routes/register');

const app = express();
=======
const publicDirectory = path.join(__dirname, './public')

console.log(__dirname);
app.use(forceSsl);
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(session({ secret: process.env.SECRET}));
>>>>>>> a78a48b2c02e3a71a8c803d6091ac56fb757bcfb

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/templates/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
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
=======
//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


//opening server and opening listening channel
app.listen(8081, function() {});
>>>>>>> a78a48b2c02e3a71a8c803d6091ac56fb757bcfb

module.exports = app.js;