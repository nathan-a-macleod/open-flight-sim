let tgeo = new ThreeGeo({
    tokenMapbox: userAPIToken, // <---- set your Mapbox API token here
});

let tile;
function addTile(radius, resolution, lat, lon){
  let terrain = tgeo.getTerrainRgb(
      [
        lat,
        lon
      ], // [lat, lng]
      radius,               // radius of bounding circle (km)
      resolution            // zoom resolution
    );
  
  terrain.then(
    function(value) { 
      console.log(value);
      value.rotation.x = THREE.Math.degToRad(-90);
      //value.scale.x = 10;
      //value.scale.y = 10;
      //value.scale.z = 10;
      //value.constUnitsSide = 10;
      value.name = "tile";
      scene.add(value);
      
      tile = value;
      paused = false; // Ensure the game is paused after the first tile is loaded
    },
    
    function(error) { 
      alert("A critical error occured. The page will now be refreshed."); 
      location.reload; 
    }
  );
}

addTile(35, parseInt(resolution), latCoord, lonCoord);