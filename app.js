var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var IMRouter = require('./routes/IM')
var wyRouter = require('./routes/wy')
var repertoryRouter = require('./routes/repertory')
var typeRouter = require('./routes/type')
var payRouter = require('./routes/yueke/pay')
var commodityRouter = require('./routes/yueke/commodity')
var storeRouter = require('./routes/yueke/store')
var userRouter = require('./routes/yueke/user')
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
app.use('/users', usersRouter);
app.use('/im',IMRouter);
app.use('/wy', wyRouter);
app.use('/repertory', repertoryRouter);
app.use('/type', typeRouter)
app.use('/pay', payRouter)
app.use('/commodity', commodityRouter)
app.use('/store', storeRouter)
app.use('/user', userRouter)
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

module.exports = app;
