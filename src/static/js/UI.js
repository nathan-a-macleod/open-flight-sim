// Variable initialisation
let latCoord;
let lonCoord;
let weather;
let heading;
let viewer;
let scene;
let globe;
let camera;
let buildingTileset;
let mousePos;
let paused = true;
let pressedKey = null;

document.getElementById("settingsDiv").style.display = "block";

document.getElementById("simulatorBtn").addEventListener("click", function(){
    document.getElementById("settingsDiv").style.display = "none";
    document.getElementById("cesiumDiv").style.display = "block";

    let airport = airports[document.getElementById("selectAirport").value];
    sessionStorage.setItem("airport", airport);
    sessionStorage.setItem("latCoord", airport.latitude);
    sessionStorage.setItem("lonCoord", airport.longitude);
    sessionStorage.setItem("heading", airport.heading);

    addScript("/static/js/setup.js");
});

document.getElementById("settingsBtn").addEventListener("click", function(){
    document.getElementById("settingsDiv").style.display = "block";
    document.getElementById("cesiumDiv").style.display = "none";

    document.getElementsByClassName("cesium-viewer")[0].remove();
});

// Add airports from the previously imported airports.js file
function addAirport(airportData){
    let option = document.createElement("option");
    option.id = airportData.name;
    let optionText = document.createTextNode(airportData.name);
    option.appendChild(optionText);
    document.getElementById("selectAirport").appendChild(option);
}
  
Object.values(airports).forEach(val => addAirport(val));

// Make the help button work
let helpDiv = document.getElementById("helpDiv");

document.getElementById("helpBtn").addEventListener("click", function(){
    if (helpDiv.style.display == "block"){
        helpDiv.style.display = "none";
    } else {
        helpDiv.style.display = "block";
    }
});