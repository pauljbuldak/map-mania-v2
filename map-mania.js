/* 
	Paul Buldak
	CPSC-24700 Web and Distributed Programming
	Sprint 4
	Fall 2019
*/

var gMap;
var loc1;
var favoritePlaces = [
    {"content":"New Lenox, IL", "coordinates":{"lat":41.5120,"lng":-87.9656}, "iconImagePath":"one.png"},
    {"content":"Kyoto, Japan", "coordinates":{"lat":35.0116,"lng":135.7681}, "iconImagePath":"flag.png"},
    {"content":"Bloomington, IL", "coordinates":{"lat":40.4842,"lng":-88.9937}, "iconImagePath":"flag.png"},
    {"content":"Paris, France", "coordinates":{"lat":48.8566,"lng":2.3522}, "iconImagePath":"two.png"},
    {"content":"Hakone, Japan", "coordinates":{"lat":35.2324,"lng":139.1069}, "iconImagePath":"flag.png"},
    {"content":"Duluth, MN", "coordinates":{"lat":46.7867,"lng":-92.1005}, "iconImagePath":"flag.png"},
    {"content":"Rome, Italy", "coordinates":{"lat":41.9028,"lng":12.4964}, "iconImagePath":"flag.png"},
    {"content":"Mackinac Island, MI", "coordinates":{"lat":45.8492,"lng":-84.6189}, "iconImagePath":"flag.png"},
    {"content":"London, England", "coordinates":{"lat":51.5074,"lng":0.1278}, "iconImagePath":"flag.png"},
    {"content":"Door County, WI", "coordinates":{"lat":44.8341,"lng":-87.3770}, "iconImagePath":"flag.png"}
];
var currentPlaceIndex = favoritePlaces.length-1;
var currentPlace = favoritePlaces[currentPlaceIndex];
var score = 0;

function initMap() {
	// Creates the map
	gMap = new google.maps.Map(document.getElementById('myMapID'), {
  		center: {lat: 37.0902, lng: -95.7129}, zoom: 4});

	// Calls update map whenever the user stops moving
    google.maps.event.addListener(gMap, 'idle', function() {
    	updateMap()
    });

    // Making a new location from the programming assignment - actual location is near Djibouti
    loc1 = new google.maps.LatLng(12.432, 43.234);


    // Adds a marker on all of the past locations that were found with 
    // an infoWindow with the name of the location
    if(currentPlaceIndex >= -1) {
        for(var i = favoritePlaces.length-1; i > currentPlaceIndex; i--) {
            lat = favoritePlaces[i].coordinates.lat;
            lng = favoritePlaces[i].coordinates.lng;
            latlng = new google.maps.LatLng(lat, lng);
            locContent = favoritePlaces[i].content;
            var marker = new google.maps.Marker({position:latlng, map:gMap});
            var infoWindow = new google.maps.InfoWindow({content:locContent});
            marker.addListener('click', function() {
                infoWindow.open(gMap,marker)
            });
        }
    }
    

    setScore();
    setHint("Hint 1");
}

function updateMap() {
	console.log('updateMap()');
    
    var lat = currentPlace.coordinates.lat;
    var lng = currentPlace.coordinates.lng;
    var latlng = new google.maps.LatLng(lat, lng);
    console.log("latlng " + latlng);
    var locContent = currentPlace.content;
    console.log("locContent " + locContent);

	// Gets the zoom level of the map
	var zoomLevel = gMap.getZoom()

	// Intializes the a boolean as false for checking if loc1 is in the bounds of the map
	var inBounds = false;

	// Checks to see if loc1 is on the current bounds of the map and changes the variable if it is
	if(gMap.getBounds().contains(latlng)) {
		inBounds = true;
	}

	// Writes to the console the boolean of if it is in the bounds and what the zoom level is
	console.log("inBounds:" + inBounds + " zoomLevel:" + zoomLevel);
    if(currentPlaceIndex > -1) {
        if(inBounds && zoomLevel >= 8) {
            console.log("Found loc number " + (currentPlaceIndex+1));
            
            alert("Congrats! You found " + currentPlace.content + ", location number " + (currentPlaceIndex+1) + "!");
            score += 10;
            setScore();
            // setHint(currentPlace.hint);
            if(score == 100) {
                win();
            }
            currentPlaceIndex = currentPlaceIndex - 1;
            currentPlace = favoritePlaces[currentPlaceIndex];
            initMap();
        }
    }    
}

// Brings up the instructions when the page loads
function gettingStarted() {
	document.getElementById('getting-started').style.visibility = 'visible';
}

// Closes the instructions when the user clicks outside the modal
window.onclick = function(event) {
  if (event.target == document.getElementById('getting-started')) {
    document.getElementById('getting-started').style.visibility = 'hidden';
  }
}

// Sets the hint input field
function setHint(hint) {
    document.getElementById("hint-id").value = hint;  
}

// Sets the score input field
function setScore() {
    document.getElementById("score-id").value = score; 
}

// Lets the user know that they won
function win() {
    alert("You win");
    document.getElementById("hint-id").value = "You've found all 10 locations!";
}

// Lets the user automatically win, this is called when the user double clicks
// on "Game" in the title
function automaticWin() {
    score = 100;
    setScore();
    currentPlaceIndex = -1;
    initMap();
    win();
}
