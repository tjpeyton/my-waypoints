var startC;
var startcll;
var endC;
var endcll;
var geocoder;
var pos1;
var pos2;
var map;
var markers = [];
var totalDist;
var totalTime;
var directionsService;
var directionsDisplay;
var startTemp;
var endTemp;
var midpoint;
var infoWindow;
var stemp;
var startName;
var endHumidity;
var endName;
var marker1temp;
var marker1Humidity;
var marker1name;
var marker2name;
var marker2temp;
var marker2Humidity;

const appKey = "f24f40b1c24505685fce3b8acd0fcffc";

let searchButton = document.getElementById("search-btn");
let startInput = document.getElementById("search-txt");
let endInput = document.getElementById("search-txt1");
let cityName = document.getElementById("city-name");
let cityName2 = document.getElementById("city-name2");
let icon = document.getElementById("icon");
let icon2 = document.getElementById("icon2");
let humidity = document.getElementById("startHumid");
let humidity1 = document.getElementById("endHumid");
let starttempdis = document.getElementById("temp");
let endtempdis = document.getElementById("temp2");
var startHumidity;

startInput.addEventListener("keyup", enterPressed);
endInput.addEventListener("keyup", enterPressed);
function initMap() {
// when page loads, init map with defualt direction route


  geocoder = new google.maps.Geocoder();
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer(
  {
      suppressMarkers: true
  });
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 41.85, lng: -87.65}
  });
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function enterPressed(event) { // When user presses enter, update information on map
  if (event.key === "Enter") {
    clearMarkers();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  }
}
// Make calls to the openweathermap api to gather weather information at the starting location, end location and the two waypoints
function findWeatherDetails() {
  if (startInput.value === "") {

  }else {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + startInput.value + "&appid="+appKey;
   httpRequestAsync(searchLink, theResponse);
   let searchLink2 = "https://api.openweathermap.org/data/2.5/weather?q=" + endInput.value + "&appid="+appKey;
  httpRequestAsync(searchLink2, theResponse2);
  let searchLink3 = "https://api.openweathermap.org/data/2.5/weather?lat=" + pos1.lat() + "&lon=" + pos1.lng() + "&appid="+appKey;
 httpRequestAsync(searchLink3, theResponse3);
 let searchLink4 = "https://api.openweathermap.org/data/2.5/weather?lat=" + pos2.lat() + "&lon=" + pos2.lng() + "&appid="+appKey;
httpRequestAsync(searchLink4, theResponse4);
  }
 }
// process each weather api response
function theResponse(response) {
  let jsonObject = JSON.parse(response);
  cityName.innerHTML = jsonObject.name;
  startName =  jsonObject.name;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  console.log(parseInt(jsonObject.main.temp - 273) + "°");
  starttempdis.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
  startTemp = "Tempature: " + parseInt(jsonObject.main.temp - 273) + "°";
  startHumidity = "Humidity: " + jsonObject.main.humidity + "%";

}

function theResponse2(response) {
  let jsonObject = JSON.parse(response);
  cityName2.innerHTML = jsonObject.name;
  endName = jsonObject.name;
  icon2.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  console.log(parseInt(jsonObject.main.temp - 273) + "°");
  endtempdis.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
  endTemp ="Tempature: " + parseInt(jsonObject.main.temp - 273) + "°";
  endHumidity ="Humidity: " + jsonObject.main.humidity + "%";
}

function theResponse3(response) {
  let jsonObject = JSON.parse(response);

  marker1name = jsonObject.name;

  console.log(parseInt(jsonObject.main.temp - 273) + "°");

  marker1temp ="Tempature: " + parseInt(jsonObject.main.temp - 273) + "°";

  marker1Humidity ="Humidity: " + jsonObject.main.humidity + "%";
}

function theResponse4(response) {
  let jsonObject = JSON.parse(response);

  marker2name = jsonObject.name;

  console.log(parseInt(jsonObject.main.temp - 273) + "°");

  marker2temp ="Tempature: " + parseInt(jsonObject.main.temp - 273) + "°";

  marker2Humidity ="Humidity: " + jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback)
{
  console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous
    httpRequest.send();
}
// feed user input to directions service and set on map.
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: startInput.value,
    destination: endInput.value,
    travelMode: 'DRIVING',

  }, function(result, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(result);
      codeAddress();
      computeTotalDistance(result);
      getCoordinates(result);

    }
    else {
      window.alert('Directions request failed due to ' + status);
    }
  });

}
// geocode the lat and lng of the start and end locations
function codeAddress() {

    var address = startInput.value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      var mystartC = new Array();
      if (status == 'OK') {
        var latLong = results[0].geometry.location
        startC = latLong.lat() + "," + latLong.lng();
        }
       else {
        alert('Geocode was not successful for the following reason: ' + status);
      }

    });

    var address = endInput.value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      var myendC = new Array();
      if (status == 'OK') {
        var latLong = results[0].geometry.location
        endC = latLong.lat() + "," + latLong.lng();
        }
       else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

    totalDist = 0;
    totalTime = 0;
// compute the total distance of the current route
    function computeTotalDistance(result) {
    totalDist = 0;
    totalTime = 0;
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++) {
      totalDist += myroute.legs[i].distance.value;
      totalTime += myroute.legs[i].duration.value;
    }
    totalDist = totalDist / 1000.
    document.getElementById("total").innerHTML = "Distance: : " + totalDist + " km<br>Travel Time: " + (totalTime / 60).toFixed(2) + " minutes";



  }
  // get the lat and lng of the waypoint markers by parsing the overview path of the current route and determining the locatoin to place marlers
  function getCoordinates(result) {

        var currentRouteArray = result.routes[0];  //Returns a complex object containing the results of the current route
        var currentRoute = currentRouteArray.overview_path;
        var numberofWaypoints =currentRoute.length;
        midPoint= result.routes[0].overview_path[parseInt( numberofWaypoints / 2)];

        pos1 = new google.maps.LatLng(currentRoute[parseInt(currentRoute.length/3)].lat(), currentRoute[parseInt(currentRoute.length/3)].lng());
        pos2 = new google.maps.LatLng(currentRoute[parseInt(currentRoute.length*(2/3))].lat(), currentRoute[parseInt(currentRoute.length*(2/3))].lng());
        startcll = new google.maps.LatLng(currentRoute[0].lat(), currentRoute[0].lng());
        endcll = new google.maps.LatLng(currentRoute[currentRoute.length - 1].lat(), currentRoute[currentRoute.length -1].lng());

        findWeatherDetails();
        displayMarkers();
  }
  //Feed each marker the position information as well as the weather information
  function displayMarkers(){

    infoWindow = new google.maps.InfoWindow({
    });

    var markerS = new google.maps.Marker({
      position: startcll,
      title:"start"

    });

    markerS.addListener('click', function() {
    infoWindow.setContent('<div>' +startName+ '<div/>' +
                          '<div>' +startTemp+ '<div/>' +
                          '<div>' +startHumidity+ '<div/>');

    infoWindow.open(map, markerS);
  });

    markers.push(markerS);

    var markerE = new google.maps.Marker({
      position: endcll,
      title:"end"
    });

    markerE.addListener('click', function() {
    infoWindow.setContent('<div>' +endName+ '<div/>' +
                          '<div>' +endTemp+ '<div/>' +
                          '<div>' +endHumidity+ '<div/>');
    infoWindow.open(map, markerE);
  });

    markers.push(markerE);

    var marker1 = new google.maps.Marker({
      position: pos1,
      title:"hello Wrld"
    });

    marker1.addListener('click', function() {
    infoWindow.setContent('<div>' +marker1name+ '<div/>' +
                          '<div>' +marker1temp+ '<div/>' +
                          '<div>' +marker1Humidity+ '<div/>');
    infoWindow.open(map, marker1);
  });

    markers.push(marker1);


    var marker2 = new google.maps.Marker({
      position: pos2,
      title:"Hello World!"
    });

    marker2.addListener('click', function() {
    infoWindow.setContent('<div>' +marker2name+ '<div/>' +
                          '<div>' +marker2temp+ '<div/>' +
                          '<div>' +marker2Humidity+ '<div/>');
    infoWindow.open(map, marker2);
  });

    markers.push(marker2);

    marker1.setMap(map);
    marker2.setMap(map);
    markerS.setMap(map);
    markerE.setMap(map);
  }

  function setMapOnAll(map) {
   for (var i = 0; i < markers.length; i++) {
     markers[i].setMap(map);
   }
  }
// clear markers after every new user input
  function clearMarkers() {
    setMapOnAll(null);
    markers = [];

  }
