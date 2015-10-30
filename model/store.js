var mongoskin = require('mongoskin');
var settings = require('../settings');
var db = mongoskin.db(settings.dbhost,{native_parser: true});

var Store = function(name,img,description,owner){
	this.name = name;
	this.img = img;
	this.description = description;
	this.owner = owner;
}

Store.prototype.create = function create(callback){
	var store = {
		name: this.name,
		img: this.img,
		description: this.description,
		owner: this.owner
	};
	db.collection('stores').insert(store, function(err, store){
		db.close();
		if(err) console.log(err)
	});
}

Store.get = function(storeName, callback){
	var query = {};
	if(storeName){
		query.name = storeName;
	}
	db.collection('stores').find(query).toArray(function(err, items){
		if(err) console.log(err);
		db.close();
		callback(null, items);		
	})
}

module.exports = Store;