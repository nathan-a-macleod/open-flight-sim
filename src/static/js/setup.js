document.body.addEventListener("keydown", function(event){
    pressedKey = event.keyCode;
});

latCoord = parseFloat(sessionStorage.getItem("latCoord"));
lonCoord = parseFloat(sessionStorage.getItem("lonCoord"));
weather = parseInt(sessionStorage.getItem("weather"));
heading = parseInt(sessionStorage.getItem("heading"));

Cesium.Ion.defaultAccessToken = userAPIToken;

viewer = new Cesium.Viewer("cesiumDiv", {
    terrainProvider : Cesium.createWorldTerrain({
        requestWaterMask : true
    })
});

scene = viewer.scene;
globe = viewer.scene.globe;
camera = viewer.camera;
scene.fog.enabled = false;

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
}, 7500);

buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());

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

addScript("/static/js/airplane.js");
addScript("/static/js/renderLoop.js");