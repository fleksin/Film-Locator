var mongoskin = require('mongoskin');
var settings = require('../settings');
var url = settings.dbhost;

var db = mongoskin.db(url, {native_parser: true});

var User = function(user){
	this.email = user.email;
	this.password = user.password;
};

User.prototype.save = function save(){
	var user = {
		email: this.email,
		password: this.password,
	};
	
	console.log('in user.js:');
	console.dir(user);
	
	db.collection('users').insert(user,function(err,user){
		db.close();
		if(err) console.log(err);
	});	
}

User.get = function(username, callback){
	db.collection('users').find({email:username}).toArray(function(err, users){
		console.log('the query is ' + username);
		db.close();
		if(users.length > 0){
			console.log('in user.js '+users[0].email);
			callback(err, users[0]);
		}
		else{
			callback(err, null);
		}
	});
}

module.exports = User;