var express = require('express');
var router = express.Router();
var assert = require('assert');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var db = require('mongoskin').db(url);

router.get('/', function(req, res, next) {	
	db.collectionNames(function(err, collections) {
		if (err) {
			console.log(err);
		} else {
			var list = [];
			for(var i = 0; i < collections.length; i++){
				list.push(collections[i].name);
			}
			res.send(list);
		}
	});
	
});

//get the rates of the current website
router.post('/findweb', function(req, res, next) {
	var reg =  req.body.region;
  db.collection('rate').find({borough: reg}).toArray(function(err, result) {
	if (err) throw err;
	res.json(result);
  }); 
	console.log("client posted! " + JSON.stringify(req.body.region));
}); 

//use to post comments
router.post('/comments', function(req, res, next) {  
  db.collection('restaurants').find().toArray(function(err, result) {
	if (err) throw err;
	res.json(result);
  }); 
}); 

router.post('/create',  function(req, res, next) {  
	var name = req.body.name;
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		db.createCollection(name, function(err, collection){
			if (err) throw err;
			console.log("Created " + name);
		});
	});
});

module.exports = router;
