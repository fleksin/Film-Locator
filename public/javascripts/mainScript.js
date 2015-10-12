(function($){
//defined model, then collection

var map;
var geocoder;
var service;
var markers = [];
var count = 0;

function initialize() {
	map = new google.maps.Map(document.getElementById('map-yard'), {
		zoom: 11,
		center: {lat: 37.708333, lng: -122.280278}
	});
}
google.maps.event.addDomListener(window, 'load', initialize);	

//define the model
var film = Backbone.Model.extend({
});

var URL = "https://data.sfgov.org/resource/yitu-d5am.json";

//define the collection
var films = Backbone.Collection.extend({
	model: film,
	url: URL
});

var fs = new films();
// var dataReady = false;
var Lats;
var Lngs;

var search = function(input) {	
	
	for(var j = 0; j < fs.length; j++){
		var title = fs.at(j).get("title");
		var userInput = input;
		var i ;
		for(i = 0; i<userInput.length; i++){
			if(userInput.charAt(i).toLowerCase() != title.charAt(i) && userInput.charAt(i).toUpperCase() != title.charAt(i)){
				i=0;
				break;
			}
		}		
		if(userInput.length > 0 && i == userInput.length){
			return title;			
		}
	};
    	
	return '';
};

function pinByGeocoder(loc, name, image, fullinfo){
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': loc, bounds: map.getBounds()}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location,
				title: name,
				icon: image
			});
			//map.center(result[0].geometry.location);
			markers.push(marker);	
			
			map.setCenter(marker.getPosition());
			map.setZoom(11);
			
			var contentString = '<div>title : ' + fullinfo.get('title') + ' <br>' 
								 + 'actor_1 : ' + fullinfo.get('actor_1') + '<br>'
								 + 'locations :' + fullinfo.get('locations') + '<br>'							
								 + "release_year : " + fullinfo.get('release_year') + '<br>'
								 + "production_company : " + fullinfo.get('production_company') + '<br>'
								 + "distributor : " + fullinfo.get('distributor') + '<br>'
								 + "actor_2 : " + fullinfo.get('actor_2') + '<br>'
								 + "writer : " + fullinfo.get('writer') + '<br>'
								 + "director : " + fullinfo.get('director') + '<br>'
			                     + '</div>';
			
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});	
			
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
				map.setCenter(marker.getPosition());
				map.setZoom(14);
			});
			
			return true;
		} 
		else {
			console.log("Geocode was not successful for the following reason: " + status);
			console.log("location:" + loc);
			return false;
		}
    });	
};

fs.fetch({  
    success: function(){
		dataReady = true
	},
    error: function(){
       console.log('There was some error in loading and processing the JSON file');
    }
});

var autoView = Backbone.View.extend({
	
	el: $('body'),
	
	template: _.template($('#autoComplete').html()),
	
	// miniTem: _.template($('#miniBar-template').html()),
	
	infoTemplate: _.template($('#infoPanel-template').html()),
	
	listTem: _.template($('#listItem-template').html()),
	
	auto : $('#autoComplete'),
	
	popout : $('#popOut'),
	
	events:{
		"keyup #bar" : 'predict',
		"mouseover #popOut" : 'selected',
		"mouseout #popOut" : 'unselect',
		// 'keypress #bar' : 'keyfill',
		'click #popOut': 'fill',
		'click .close-button': 'closePanel',
		'click h1 a': 'search',
		'click #miniBar': 'showPanel',
		'click .close': 'Delete',
		'click .random' : 'random'
		
	},	
	
	initialize:function(){
		this.auto.hide();	
		$('body').append(this.infoTemplate());		
		//this.$('.header').html(this.miniTem({title:''}));
		this.render();
		
	},
		
	predict:function(e){
		
		console.log(e.keyCode);
	
		if(e.keyCode == 13)this.search();
		
		if(e.keyCode == 9 || e.keyCode == 40) this.fill();
		
		var input = $('#bar').val();
		var res = search(input);
		
		if(input.length){
			(this.popout).text(this.template({complete: res}));			
			this.popout.show();
		}
		else{
			this.popout.hide();
			this.popout.empty();
		}
		
	
		//(this.$('#autoComplete')).html(this.template({complete: 'test'}));
	},
	
	selected: function(){
		this.$('#popOut').css({'background-color': 'blue'});
	},
	
	unselect: function(){
		this.$('#popOut').css({'background-color': 'white'});
	},
	
	fill: function(e){
		this.$('#bar').val(this.popout.text());
		
	},
	
	keyfill: function(e){
		// if(e.keyCode == 
	},
	
	closePanel: function(){
		this.$('div#panel').slideUp("slow");
	},
	
	render:function(){
		this.popout.hide();
	},
	
	search:function(randominput){
		var stat = false;
		var moviename = this.popout.text();		
		if(typeof randominput == 'string' ) moviename = randominput;
		if(moviename){
			if(count>6)count = 0;			
			var res = fs.where({title:moviename});
			//this.$('#miniBar').html(this.miniTem({title:moviename}));
			//this.$('#miniBar-template').show();
			var pinURL = '/images/pin' + count + '.png';
			for(var i = 0; i < res.length; i++){
				var ret = pinByGeocoder(res[i].get('locations'), moviename, pinURL,res[i]);
				if(ret = true) stat = true;
			}
			this.addToList(pinURL, moviename);
			count++;
		}
		else{ 
			alert("not found in the database!! try again!");
			console.log("location not found");
		}
		
		if(stat){
			this.$('#bar').val('');
			this.popout.empty();
			this.popout.hide();
			this.closePanel();
		}
		else
			console.log("Can't find the result on google Map!");
	},
	
	showPanel: function(){
		this.$('div#panel').slideDown("slow");
	},
	
	addToList:function(pin, title){
		$('#infoPanel').append(this.listTem({image:pin, title:title}));
	},
	
	Delete:function(e){
		var title = $(e.target).parent('li').text();
		$(e.target).parent('li').remove();	
        for(var i =0 ; i < markers.length; i++){
			if(markers[i].getTitle() == title){
				markers[i].setMap(null);
				markers.splice(i, 1);
				i--;
			}
		}			
	},
	
	random:function(){
		var index = parseInt(Math.random() * 1000);
		var randomTitle = fs.at(index).get('title');
		this.search(randomTitle);
	}
	
});


$(document).ready(function(){	
	var av = new autoView();
	//var infoP = new infoPanel();
});

})(jQuery);
