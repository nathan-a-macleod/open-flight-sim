// Add the map widget
mapboxgl.accessToken = userAPIToken;
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-0.10069461959233195, 51.51026548499621],
  zoom: 5,
  antialias: true,
});

// Add navigation controls to the map widget
map.addControl(new mapboxgl.NavigationControl());

// Allow the user to switch between different map styles
const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');
 
for (const input of inputs) {
  input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
  };
}

// Add airports
let chosenAirport = airports["London Heathrow Airport"];

function addAirport(airportData){
  function resetColor(element, current){
    if (element.name != current){
      document.getElementById(element.name).children[0].children[0].children[1].children[0].style.fill = "#3b5998";
    }
  }

  let airport = new mapboxgl.Marker();
  airport = airport.setLngLat([airportData.longitude, airportData.latitude]);
  airport.addTo(map);
  airport.getElement().children[0].children[0].children[1].children[0].style.fill = "#3b5998"
  airport.getElement().setAttribute("id", airportData.name);

  airport.getElement().addEventListener("click", function(){
    chosenAirport = airportData;
    airport.getElement().children[0].children[0].children[1].children[0].style.fill = "#e8dc5a";
    Object.values(airports).forEach(val => resetColor(val, airportData.name));
  });
}

Object.values(airports).forEach(val => addAirport(val));
document.getElementById(chosenAirport.name).children[0].children[0].children[1].children[0].style.fill = "#e8dc5a";

let latCoord;
let lonCoord;
let resolution;
let resolutionInput = document.getElementById("resolutionInput");
let resolutionText = document.getElementById("resolutionText");
resolutionInput.addEventListener("change", function(){
  resolutionText.innerHTML = "Resolution: " + resolutionInput.value;
});

let radius;
let radiusInput = document.getElementById("radiusInput");
let radiusText = document.getElementById("radiusText");
radiusInput.addEventListener("change", function(){
  radiusText.innerHTML = "Radius: " + radiusInput.value + " KM";
});

let weather;
let weatherInput = document.getElementById("weatherInput");
let weatherText = document.getElementById("weatherText");
weatherInput.addEventListener("change", function(){
  weatherText.innerHTML = "Weather Quality: " + weatherInput.value + " %";
});

document.getElementById("launchBtn").addEventListener("click", function(){
  sessionStorage.setItem("latCoord", chosenAirport.latitude);
  sessionStorage.setItem("lonCoord", chosenAirport.longitude);
  latCoord = chosenAirport.latitude;
  lonCoord = chosenAirport.longitude;

  resolution = resolutionInput.value;
  sessionStorage.setItem("resolution", resolution);

  radius = radiusInput.value;
  sessionStorage.setItem("radius", radius);

  weather = weatherInput.value;
  sessionStorage.setItem("weather", weather);

  document.getElementById("setupDiv").style.display = "none";
  
  addScript("/static/js/setup.js");

  ///*
  setTimeout(function(){
    addScript("/static/js/tile.js");
  }, 1000);

  setTimeout(function(){
    addScript("/static/js/clouds.js");
  }, 1000);

  setTimeout(function(){
    addScript("/static/js/UI.js");
  }, 1000);

  setTimeout(function(){
    addScript("/static/js/renderLoop.js");
  }, 1000);
  //*/

  /*
  addScript("/static/js/tile.js");
  addScript("/static/js/UI.js");
  addScript("/static/js/clouds.js");
  addScript("/static/js/renderLoop.js");
  */
});