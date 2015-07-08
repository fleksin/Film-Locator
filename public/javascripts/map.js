var map;
function initialize() {
	map = new google.maps.Map(document.getElementById('map-yard'), {
		zoom: 8,
		center: {lat: 37.708333, lng: -122.280278}
	});
}

google.maps.event.addDomListener(window, 'load', initialize);

console.log(fs.at(55).get('title'));