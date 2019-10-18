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
    {"content":"Seattle, WA", "coordinates":{"lat":47.6062,"lng":-122.3321}, "iconImagePath":"flag.png"},
    {"content":"Kyoto, Japan", "coordinates":{"lat":35.0116,"lng":135.7681}, "iconImagePath":"flag.png"},
    {"content":"Bloomington, IL", "coordinates":{"lat":40.4842,"lng":-88.9937}, "iconImagePath":"flag.png"},
    {"content":"Paris, France", "coordinates":{"lat":48.8566,"lng":2.3522}, "iconImagePath":"two.png"},
    {"content":"San Francisco, CA", "coordinates":{"lat":37.7749,"lng":-122.4194}, "iconImagePath":"flag.png"},
    {"content":"Duluth, MN", "coordinates":{"lat":46.7867,"lng":-92.1005}, "iconImagePath":"flag.png"},
    {"content":"Rome, Italy", "coordinates":{"lat":41.9028,"lng":12.4964}, "iconImagePath":"flag.png"},
    {"content":"Mackinac Island, MI", "coordinates":{"lat":45.8492,"lng":-84.6189}, "iconImagePath":"flag.png"},
    {"content":"Door County, WI", "coordinates":{"lat":44.8341,"lng":-87.3770}, "iconImagePath":"flag.png"}
];
var currentPlaceIndex = favoritePlaces.length-1;
var currentPlace = favoritePlaces[currentPlaceIndex];
var score = 0;

function initMap() {
	// Creates the map
	gMap = new google.maps.Map(document.getElementById("myMapID"), {
  		center: {"lat": 37.0902, "lng": -95.7129}, "zoom": 4});

	// Calls update map whenever the user stops moving
    google.maps.event.addListener(gMap, "idle", function() {
    	updateMap()
    });

    // Making a new location from the programming assignment - actual location is near Djibouti
    loc1 = new google.maps.LatLng(12.432, 43.234);


    // Adds a marker on all of the past locations that were found with 
    // an infoWindow with the name of the location
    if(currentPlaceIndex >= -1) {
        for(var i = favoritePlaces.length-1; i > currentPlaceIndex; i--) {
            latlng = new google.maps.LatLng(favoritePlaces[i].coordinates);
            locContent = favoritePlaces[i].content;
            var marker = new google.maps.Marker({"position":latlng, "map":gMap});
            var infoWindow = new google.maps.InfoWindow({"content":locContent});
            marker.addListener("click", function() {
                infoWindow.open(gMap,marker)
            });
        }
    }
    

    setScore();
    setHint("Welcome to the game");
}

function updateMap() {
	console.log("updateMap()");
    
    var latlng = new google.maps.LatLng(currentPlace.coordinates);
    var locContent = currentPlace.content;

	// Gets the zoom level of the map
	var zoomLevel = gMap.getZoom()

	// Intializes the a boolean as false for checking if loc1 is in the bounds of the map
	var inBounds = false;

	// Checks to see if loc1 is on the current bounds of the map and changes the variable if it is
	if(gMap.getBounds().contains(latlng)) {
		inBounds = true;
	}

    // Sets the hint if the location is in the bounds and tells the user to zoom in
    if(inBounds && zoomLevel < 8) {
        if(zoomLevel == 7) {
            setHint("You're on fire");
        } else if(zoomLevel == 6) {
            setHint("You're really close, zoom in");
        } else if(zoomLevel == 5) {
            setHint("Keep on zoomin");
        } else if(zoomLevel == 4) {
            setHint("You are getting closer, zoom in");
        } else if(zoomLevel == 3) {
            setHint("Keep on zoomin");
        } else if(zoomLevel == 2) {
            setHint("You are getting there, zoom in");
        }
    }

    var boundsN = gMap.getBounds().getNorthEast().lat();
    var boundsE = gMap.getBounds().getNorthEast().lng();
    var boundsS = gMap.getBounds().getSouthWest().lat();
    var boundsW = gMap.getBounds().getSouthWest().lng();
    // Sets the hints if the location is not wihtin the bounds
    if(currentPlace.coordinates.lng > boundsE) {
        setHint("Go East");
    } else if(currentPlace.coordinates.lng < boundsW) {
        setHint("Go West");
    } else if(currentPlace.coordinates.lat > boundsN) {
        setHint("Go North");
    } else if(currentPlace.coordinates.lat < boundsS) {
        setHint("Go South");
    } 

	// Writes to the console the boolean of if it is in the bounds and what the zoom level is
	console.log("inBounds:" + inBounds + " zoomLevel:" + zoomLevel);
    if(currentPlaceIndex > -1) {
        if(inBounds && zoomLevel >= 8) {
            console.log("Found loc number " + (currentPlaceIndex+1));
            
            document.getElementById("header-text").innerHTML = "Congrats";
            document.getElementById("body-text").innerHTML = "Congrats! You found " + currentPlace.content + ", location number " 
            + (currentPlaceIndex+1) + "! <br><br>You can click the &times; button or anywhere outside of this box to continue." ;
            showModal();
            score += 10;
            setScore();
            
            if(score == 100) {
                win();
            }
            currentPlaceIndex = currentPlaceIndex - 1;
            currentPlace = favoritePlaces[currentPlaceIndex];
            initMap();
        }
    }    
}

// Makes the modal visible
function showModal() {
	document.getElementById("my-modal").style.visibility = "visible";
}

// Closes the modal when the user clicks outside of it
window.onclick = function(event) {
  if (event.target == document.getElementById("my-modal")) {
    document.getElementById("my-modal").style.visibility = "hidden";
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
    document.getElementById("header-text").innerHTML = "You Won!";
    document.getElementById("body-text").innerHTML = "Congrats! You found all 10 locations! You can now view all of the locations. " 
        + "Thanks for playing! <br><br>You can click the &times; button or anywhere outside of this box to continue." ;
    showModal();
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
