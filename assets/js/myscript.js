var x = document.getElementById("coord");
var curr_condi = document.getElementById("curr_condi");
var curr_temp = document.getElementById("curr_temp");
var max_temp = document.getElementById("max_temp");
var min_temp = document.getElementById("min_temp");

const apiKeyWeather = "74b9879caf2eb7d5986f059005a4e681";
   
var request = new XMLHttpRequest();

let theLat = 38.98;
let theLong = -76.94;

function getLocation(){

  x.innerHTML = "";
  curr_condi.innerHTML = "";
  curr_temp.innerHTML = "";
  max_temp.innerHTML = "";
  min_temp.innerHTML = "";

  //let city = document.getElementById("city").value;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${theLat}&lon=${theLong}&units=imperial&appid=74b9879caf2eb7d5986f059005a4e681`;

  request.open('GET', url , true);
  request.onload = function () {

    let weather = JSON.parse(this.response);

    // Begin accessing JSON data here
    if(weather.coord == undefined){
      x.innerHTML = 'Please enter a valid location';
    } else {
      let weatherCoords = `Latitude: ${weather.coord.lat}, Longitude: ${weather.coord.lon}`;
      //x.innerHTML = weatherCoords;
      theLat = weather.coord.lat;
      theLong = weather.coord.lon;
    }

    if(weather.main == undefined){
      x.innerHTML = 'Please enter a valid location';
    } else {
      curr_condi.innerHTML = weather.weather[0].main;
      curr_temp.innerHTML = `${weather.main.temp}`;
      max_temp.innerHTML = `${weather.main.temp_max}`;
      min_temp.innerHTML = `${weather.main.temp_min}`;
    }

  }

  request.send();

}

function initAutocomplete() {

  let loc = {lat: parseFloat(theLat), lng: parseFloat(theLong)};

  var map = new google.maps.Map(document.getElementById('map'), {
          center: loc,
          zoom: 15,
          mapTypeId: 'roadmap'
  });
  
  // Create the search box and link it to the UI element.
  var input = document.getElementById('city');
  var searchBox = new google.maps.places.SearchBox(input);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {

      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)};

            // Create a marker for each place.
      markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
      }));

      theLat = place.geometry.location.lat();
      theLong = place.geometry.location.lng(); 

      getLocation();

      if (place.geometry.viewport) {
              // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

// Initialize and add the map
// function initMap() {
  
//   let loc = {lat: parseFloat(theLat), lng: parseFloat(theLong)};
  
//   let map = new google.maps.Map(
//       document.getElementById('map'), {zoom: 15, center: loc});
  
//   let marker = new google.maps.Marker({position: loc, map: map});

// }