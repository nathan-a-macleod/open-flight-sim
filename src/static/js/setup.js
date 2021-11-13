let latCoord = parseFloat(sessionStorage.getItem("latCoord"));
let lonCoord = parseFloat(sessionStorage.getItem("lonCoord"));
let weather = parseInt(sessionStorage.getItem("weather"));
let heading = parseInt(sessionStorage.getItem("heading"));

setTimeout(function(){
    addScript("/static/js/UI.js");
}, 1000);

Cesium.Ion.defaultAccessToken = userAPIToken;

const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider : Cesium.createWorldTerrain({
        requestWaterMask : true
    })
});

document.getElementsByClassName("cesium-viewer-toolbar")[0].remove();
document.getElementsByClassName("cesium-viewer-timelineContainer")[0].remove();
document.getElementsByClassName("cesium-viewer-animationContainer")[0].remove();
document.getElementsByClassName("cesium-viewer-fullscreenContainer")[0].remove();

setTimeout(function(){
    document.getElementsByClassName("cesium-viewer-bottom")[0].classList.add("UI");
    document.getElementsByClassName("cesium-viewer-bottom")[0].style.left = null;
    document.getElementsByClassName("cesium-viewer-bottom")[0].style.bottom = null;
    document.getElementsByClassName("cesium-viewer-bottom")[0].style.left = "32px";
    document.getElementsByClassName("cesium-viewer-bottom")[0].style.bottom = "32px";
}, 5000);

const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());

buildingTileset.style = new Cesium.Cesium3DTileStyle({
    color: {
        conditions: [
            ["true", "color('#7f7b79')"]
        ],
    },
});

function resetView(){
    viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(
            lonCoord, 
            latCoord, 
            2000
        ),
        orientation : {
            heading : Cesium.Math.toRadians(heading),
            pitch : Cesium.Math.toRadians(0.0),
            roll : 0.0
        }
    });
}

document.getElementById("resetViewBtn").addEventListener("click", function(){
    resetView();
});

resetView();