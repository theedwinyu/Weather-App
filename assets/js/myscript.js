var x = document.getElementById("coord");
var y = document.getElementById("weather");

const apiKeyWeather = "74b9879caf2eb7d5986f059005a4e681";
   
var request = new XMLHttpRequest();

function getLocation(){

  x.innerHTML = "";
  y.innerHTML = "";

  let city = document.getElementById("city").value;

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=74b9879caf2eb7d5986f059005a4e681`;

  request.open('GET', url , true);
  request.onload = function () {

    let weather = JSON.parse(this.response);

    // Begin accessing JSON data here
    if(weather.coord == undefined){
      x.innerHTML = 'Please enter a valid City';
    } else {
      let weatherCoords = `Latitude: ${weather.coord.lat}, Longitude: ${weather.coord.lon}`;
      x.innerHTML = weatherCoords;
      initMap(weather.coord.lat,weather.coord.lon)
    }

    if(weather.main == undefined){
      x.innerHTML = 'Please enter a valid City';
    } else {
      let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      y.innerHTML = weatherText;
    }

  }

  request.send();

}

// Initialize and add the map
function initMap(theLat, theLong) {
  // The location of Uluru
  
  let loc = {lat: parseFloat(theLat), lng: parseFloat(theLong)};
  //let loc = {lat: 38.98, lng: -76.94};
  // The map, centered at Uluru
  let map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: loc});
  // The marker, positioned at Uluru
  let marker = new google.maps.Marker({position: loc, map: map});
}