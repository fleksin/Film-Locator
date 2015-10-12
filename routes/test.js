var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  //res.send('aha');
  next();
});

router.get('/',function (req, res, next) {
   res.send('aha');
});

// a middleware sub-stack shows request info for any type of HTTP request to /user/:id
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack which handles GET requests to /user/:id
router.get('/user/:id', function (req, res, next) {
  // if user id is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // else pass the control to the next middleware in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('index');
});

// handler for /user/:id which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log('id: ' + req.params.id);
  res.render('layout');
});

module.exports = router;
