var express = require('express');
var router = express.Router();
var settings = require('../settings');

var url = settings.dbhost;
var mongoskin = require('mongoskin');
//var db = require('mongoskin').db(url);
var db = mongoskin.db(url, {native_parser: true});
/* GET users listing. */
router.get('/', function(req, res, next) { 
  db.collection('projects').find().toArray(function(err, items){
	  if(err) console.log(err);
	  res.json(items);
	  db.close();
  });
});



module.exports = router;
