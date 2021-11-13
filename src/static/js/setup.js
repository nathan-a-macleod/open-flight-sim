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

const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());

buildingTileset.style = new Cesium.Cesium3DTileStyle({
    color: {
        conditions: [
            ["true", "color('#7f7b79')"]
        ],
    },
});

viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(
        lonCoord, 
        latCoord, 
        400
    ),
    orientation : {
        heading : Cesium.Math.toRadians(heading),
        pitch : Cesium.Math.toRadians(0.0),
        roll : 0.0
    }
});