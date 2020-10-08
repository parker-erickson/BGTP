var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var cartRouter = require('./routes/cart');
var productsRouter = require('./routes/products');
var profileRouter = require('./routes/profile');
var postRouter = require('./routes/post');
var signupRouter = require('./routes/signup');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/userspage', usersRouter);
app.use('/cart', cartRouter);
app.use('/post', postRouter);
app.use('/products',productsRouter);
app.use('/signup',signupRouter);
app.use('/profile',profileRouter);



/* Helper Functions */

function isAuthenticated(req, res, next){
    if(!req.session.authenticated) res.redirect('/login');
    else next();
}

app.get('/post', isAuthenticated, function(req, res){
   res.render('post');
});

app.post('/planFlight', isAuthenticated, function(req, res){

  let title  = req.listing_fk0.title; 
  let photo  = req.listing_fk0.photo_url;
  let pdescrip = req.listing_fk0.description;
  let shippingPrice = req.listing_fk0.shippingPrice;
  let condition = req.listing_fk0.shippingPrice;
  let price = req.listing_fk0.price;
  let gameId = req.listing_fk0.game_id;



  let stmt = 'INSERT INTO listing_fk0 (user_id, game_id, photo_url, condition, description, shippingPrice, price,title) VALUES (?,?,?,?,?,?)';
  let data = [user_id,gameId,photo,condition,pdescrip,shippingPrice,price,title];
  let con = herokuConnection();
  con.query(stmt, data, function(error, result){
     if(error) throw error;
     con.end();
     res.redirect('/post');
  });
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//Console output
app.listen(process.env.PORT, function() {
  console.log("Express server is running...");
});

//opening server and opening listening channel
var server = app.listen(8081, function() {
  //opens server on port 3000, does stuff
});

module.exports = app;
