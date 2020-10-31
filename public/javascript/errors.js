const express = require('express')

const app = express()

const createError = require('http-errors');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
<<<<<<< HEAD
});
=======
});
>>>>>>> a78a48b2c02e3a71a8c803d6091ac56fb757bcfb
