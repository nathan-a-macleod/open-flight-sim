// Add airports from the previously imported airports.js file
function addAirport(airportData){
  let option = document.createElement("option");
  option.id = airportData.name;
  let optionText = document.createTextNode(airportData.name);
  option.appendChild(optionText);
  document.getElementById("selectAirport").appendChild(option);
}

Object.values(airports).forEach(val => addAirport(val));

let weatherInput = document.getElementById("weatherInput");
let weatherText = document.getElementById("weatherText");
weatherInput.addEventListener("change", function(){
  weatherText.innerHTML = "Weather Quality: " + weatherInput.value + " %";
});

document.getElementById("launchBtn").addEventListener("click", function(){
  let airport = airports[document.getElementById("selectAirport").value];
  sessionStorage.setItem("latCoord", airport.latitude);
  sessionStorage.setItem("lonCoord", airport.longitude);
  sessionStorage.setItem("heading", airport.heading);
  sessionStorage.setItem("weather", weatherInput.value);

  document.getElementById("setupDiv").style.display = "none";
  
  addScript("/static/js/setup.js");
});