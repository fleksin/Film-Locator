var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var cookieSession = require('cookie-session');
var mongoStore = require('connect-mongo')(session);
var settings =  require('./settings');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var db = require('./routes/db');
var OneRent = require('./routes/OneRent');
var midTest = require('./routes/test');
var projects = require('./routes/projects');
var myTailer = require('./routes/myTailer');

var app = express();
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
	saveUninitialized: 'false',
	store: new mongoStore({url: settings.dbhost, db: 'test'})
}));
/* app.use(cookieSession({
	secret: settings.secret
})); */
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser('secret'));
//app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(function(req,res,next){
    res.locals.session = req.session;
	//req.session.flash = null;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/db', db);
app.use('/onerent', OneRent);
app.use('/test', midTest);
app.use('/projects', projects);
app.use('/myTailer', myTailer);

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
