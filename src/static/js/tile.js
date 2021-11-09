let tgeo = new ThreeGeo({
    tokenMapbox: userAPIToken, // <---- set your Mapbox API token here
});

let activeTile;
let secondryTile;
function addTile(radius, resolution, lat, lon){
  // ----------
  // The active tile:
  // ----------
  let activeTerrain = tgeo.getTerrainRgb(
    [
      lat,
      lon
    ],               // [lat, lng]
    radius,          // radius of bounding circle (km)
    resolution       // zoom resolution
  );
  
  activeTerrain.then(
    function(value1) {
      console.log("Active terrain: ", value1);

      value1.rotation.x = THREE.Math.degToRad(-90);
      value1.name = "activeTile";
      scene.add(value1);

      // Add the water
      /*
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({color: 0x57a3c6, side: THREE.DoubleSide});
      const activeWater = new THREE.Mesh(geometry, material);

      activeWater.rotation.x = THREE.Math.degToRad(90);
      activeWater.position.y = 0.00001;
      
      scene.add(activeWater);
      */
      
      activeTile = value1;

      // ----------
      // The secondry tile:
      // ----------
      let secondryTerrain = tgeo.getTerrainRgb(
        [
          lat,
          lon
        ],                            // [lat, lng]
        100,                          // radius of bounding circle (km)
        parseInt(resolution / 1.5)    // zoom resolution
      );
      
      secondryTerrain.then(
        function(value2) { 
          console.log("Secondry terrain: ", value2);
    
          value2.rotation.x = THREE.Math.degToRad(-90);
          value2.name = "secondryTile";
          value2.scale.x = 20;
          value2.scale.y = 20;
          value2.scale.z = 1;
          value2.position.y = -0.05;
          scene.add(value2);
          
          secondryTile = value2;
    
          paused = false; // Ensure the game is paused after the first tile is loaded
        },
        
        function(error) { 
          alert("A critical error occured. The page will now be refreshed."); 
          location.reload(); 
        }
      );
    },
    
    function(error) { 
      alert("A critical error occured. The page will now be refreshed."); 
      location.reload(); 
    }
  );
}

addTile(parseFloat(radius), parseInt(resolution), latCoord, lonCoord);