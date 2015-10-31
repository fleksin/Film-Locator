var mongoskin = require('mongoskin');
var settings = require('../settings');

var Item = function(name,img,description,owner){
	this.name = name;
	this.img = img;
	this.description = description;
	this.owner = owner;
}

Item.prototype.create = function create(callback){
	var Item = {
		name: this.name,
		img: this.img,
		description: this.description,
		owner: this.owner
	};
	var db = mongoskin.db(settings.dbhost,{native_parser: true});
	db.collection('items').insert(store, function(err, store){
		db.close();
		if(err) console.log(err)
	});
}

Item.get = function(storeName, callback){
	var query = {};
	if(storeName){
		query.name = storeName;
	}
	var db = mongoskin.db(settings.dbhost,{native_parser: true});
	db.collection('items').find(query).toArray(function(err, items){
		if(err) console.log(err);
		db.close();
		callback(null, items);		
	})
}

module.exports = Item;
