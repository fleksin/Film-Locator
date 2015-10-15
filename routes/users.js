var express = require('express');
var router = express.Router();
var settings = require('../settings');

// var url = 'mongodb://fleksin.com:27017/test';
var url = settings.dbhost;
var mongoskin = require('mongoskin');
//var db = require('mongoskin').db(url);
var db = mongoskin.db(url,{native_parser: true});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req,res,next){
	var email = req.body.email;
	var ps = req.body.ps;
	var id = 'no such user';
	console.log("email: " + email + " password: " + ps);
	db.collection('user').find({email:email, password:ps}).toArray(function(err, items){
		if(items.length > 1){
			console.log('duplicate user');
			//db.close();
		}
		else{
			id = items[0].id;
			//console.log(id);
			//db.close();
			res.json({id:id});
		}
		console.log('db closing');
		db.close();
		console.log('db closed');
	});
	//req.session.user = email;
	
});

module.exports = router;
