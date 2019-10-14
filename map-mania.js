/* 
	Paul Buldak
	CPSC-24700 Web and Distributed Programming
	Sprint 4
	Fall 2019
*/

var gMap;
var loc1;

function initMap() {
	// Creates the map
	gMap = new google.maps.Map(document.getElementById('map'), {
  		center: {lat: 37.0902, lng: -95.7129}, zoom: 4});

	google.maps

	// Calls update map whenever the user stops moving
    google.maps.event.addListener(gMap, 'idle', function() {
    	updateMap()
    });

    // Making a new location from the programming assignment - actual location is near Djibouti
    loc1 = new google.maps.LatLng(12.432, 43.234);

    // Adding a marker for New Lenox, IL with an info window that says "New Lenox, IL"
    var marker = new google.maps.Marker({position:{lat:41.5120, lng:-87.9656}, map:gMap});
    var infoWindow = new google.maps.InfoWindow({content:'<h2>New Lenox, IL</h2>'});
    marker.addListener('click', function() {
    	infoWindow.open(gMap,marker)
    });


}

function updateMap() {
	console.log('updateMap()');

	// Gets the zoom level of the map
	var zoomLevel = gMap.getZoom()

	// Intializes the a boolean as false for checking if loc1 is in the bounds of the map
	var inBounds = false;

	// Checks to see if loc1 is on the current bounds of the map and changes the variable if it is
	if(gMap.getBounds().contains(loc1)) {
		inBounds = true;
	}

	// Writes to the console the boolean of if it is in the bounds and what the zoom level is
	console.log("inBounds:" + inBounds + " zoomLevel:" + zoomLevel);
}

// Brings up the instructions when the page loads
function showModal() {
	document.getElementById('myModal').style.display='block';
}

// Closes the instructions when the user clicks outside the modal
window.onclick = function(event) {
  if (event.target == document.getElementById('myModal')) {
    document.getElementById('myModal').style.display = 'none';
  }
}

