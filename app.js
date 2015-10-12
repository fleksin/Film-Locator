var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieSession = require('cookie-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var db = require('./routes/db');
var OneRent = require('./routes/OneRent');
var midTest = require('./routes/test');
var settings = require('./settings');

var app = express();
//app.set('port', process.env.PORT || 80);
// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
	secret: settings.secret,
	resave: 'true',
	saveUninitialized: 'false'
}));
/* app.use(cookieSession({
	secret: settings.secret
})); */
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/db', db);
app.use('/onerent', OneRent);
app.use('/test', midTest);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//app.listen(app.get('port'));

module.exports = app;
