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

  let city = document.getElementById("city").value;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=74b9879caf2eb7d5986f059005a4e681`;

  request.open('GET', url , true);
  request.onload = function () {

    let weather = JSON.parse(this.response);

    // Begin accessing JSON data here
    if(weather.coord == undefined){
      x.innerHTML = 'Please enter a valid city';
    } else {
      let weatherCoords = `Latitude: ${weather.coord.lat}, Longitude: ${weather.coord.lon}`;
      x.innerHTML = weatherCoords;
      theLat = weather.coord.lat;
      theLong = weather.coord.lon;
      initMap()
    }

    if(weather.main == undefined){
      x.innerHTML = 'Please enter a valid city';
    } else {
      console.log(weather.weather[0].main);
      curr_condi.innerHTML = weather.weather[0].main;
      curr_temp.innerHTML = `${weather.main.temp}`;
      max_temp.innerHTML = `${weather.main.temp_max}`;
      min_temp.innerHTML = `${weather.main.temp_min}`;
    }

  }

  request.send();

}

// Initialize and add the map
function initMap() {
  
  let loc = {lat: parseFloat(theLat), lng: parseFloat(theLong)};
  
  let map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: loc});
  
  let marker = new google.maps.Marker({position: loc, map: map});
}