var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //res.location('./index.html');
  //res.sendFile('./package.json');
});

module.exports = router;
