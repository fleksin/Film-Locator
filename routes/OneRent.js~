var express = require('express');
var router = express.Router();
var assert = require('assert');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://root:happyday123@apollo.modulusmongo.net:27017/T9awevaz';
var db = require('mongoskin').db(url);

router.get('/', function(req, res, next) {		
	db.collection('newslscrapes').find({location: ' mountain view'}).limit(100).toArray(function(err, result){
		if (err) {throw err;  console.log('error');}
		if(result.length == 0) {console.log('no match'); res.send('no match');}
		else {res.json(result);	}
		
	});
});
	
router.post('/search', function(req, res, next) {	
	var loc = req.body.word;
	//db = require('mongoskin').db(url);
	db.collection('newslscrapes').find({location: loc}).limit(100).toArray(function(err, result){
		if (err) {throw err;  console.log('error');}
		if(result.length == 0) {console.log('no match'); res.send('no match');}
		else {res.json(result);	}
		db.close();		
	});
});



module.exports = router;
