var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var cartRouter = require('./routes/cart');
var productsRouter = require('./routes/products');
var profileRouter = require('./routes/profile');
var postRouter = require('./routes/post');
var signupRouter = require('./routes/post');


var app = express();

if (process.env.JAWSDB_URL) {
  const connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  // create connection
  const connection =  mysql.createConnection({
    host: 'localhost'	,
    user: 'root',
    password: 'password',
    database: 'bgtp',
  });
}

var PORT = process.env.PORT || 8000

//connect
connection.connect((err) => {
  if(err){
    console.log('error');
  } else {
    console.log('connected to database')
  }
});

  //TODO select statement

//   app.get ('/', function(req, res){
//   connection.query('SELECT * FROM quotes', function(err, data) {
//     if (err) throw err;
//
//     res.json(data)
//     })
//     })
//
//     app.listen(PORT)
// })

//
//   console.log('mysql connected');
// });
//
//
// app.listen(PORT, () => {
//   console.log('Server started on port ' + PORT.toString());
// });


// //create db
// app.get('/createdb', (req, res) => {
//   let sql = 'CREATE DATABASE nodemysql';
//   db.query(sql, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.send('database created...')
//   });
// });



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
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/post', postRouter);
app.use('/products',productsRouter);
app.use('/signup',signupRouter);
app.use('/profile',profileRouter);




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
