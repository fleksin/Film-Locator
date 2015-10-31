var express = require('express');
var router = express.Router();
var settings = require('../settings');
var crypto = require('crypto');
var bodyParser = require('body-parser');

// var url = settings.dbhost;
// var mongoskin = require('mongoskin');
// var db = mongoskin.db(url,{native_parser: true});

var user = require('../model/user');
var item = require('../model/item');

/* GET users listing. */
router.get('/',function(req, res, next) {
	console.log('in root route: ' + Date());
	if(!req.session.user)req.session.flash = null;
	console.log('before item.get: ' + Date());
	item.get(null, function(err, items){
		console.log('inside item.get callback: ' + Date());
		if(err) console.log('Error at myTailer/->item.get: '+err);
		//console.log('get the stores:');
		//console.log(stores);
		console.log('before item.get->render: ' + Date());
		res.render('plaza', { data: items });
		console.log('after render: ' + Date());
	});	
});

router.post('/login', function(req,res,next){
	console.log(req.body);
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.pw).digest('base64');
	
	user.get(req.body.email, function(err, user){
		if(user){			
			if(password == user.password){
			   req.session.user = user;
			   req.session.flash = null;
			   req.flash('success', 'Log in successfully');
				
			}
			else{
				req.session.flash = null;
			   req.flash('error', 'Invalid Password');			
			}
			res.redirect('/myTailer');
		}
		else{	
			req.session.flash = null;
			req.flash('error', "Email doesn't exist, Sign Up?");
			req.session.email = req.body.email;
			res.redirect('/myTailer/signup');
			// res.end();
		}		
	});	
});

router.get('/login', function(req, res, next) {
	if(!req.session.user) req.session.flash = null;
		
	res.render('Login');
});

router.get('/signup', function(req, res){
	// var username = 'Hey New Guy!';
	// if(req.session.user) username = user.name;
	res.render('register');
});

router.post('/signup', function(req, res){
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.pw).digest('base64');

	console.log('in myTailer.js: ');
	console.dir(req.body);
	if(req.body.pw !== req.body.pwrepeat){
		console.log('not the same pw');
		req.session.flash = null;
		req.flash('error', 'Repeat Password is not the same as the other one');
		res.redirect('/myTailer/signup');
	}
	else{
		console.log('will add new user');
		var newUser = new user({
			email: req.body.email,
			password: password
		});
		req.session.user = newUser;
		newUser.save();
		req.session.flash = null;
		req.flash('success', 'You are good to go!');
		res.redirect('/myTailer/login');
	}
	
});

router.get('/logout', function(req, res){
	if(req.session){
		req.session.user = null;
		req.session.flash = null;
		// req.session= null;
	}
	res.redirect('/myTailer/login');
})

router.get('/profile', function(req, res){
	res.render('upload');
})

module.exports = router;
