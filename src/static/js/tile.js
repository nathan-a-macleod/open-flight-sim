let tgeo = new ThreeGeo({
  tokenMapbox: userAPIToken, // <---- set your Mapbox API token here
});

function addTile(radius, resolution, lat, lon, scaleX, scaleY, scaleZ, positionY){
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
    function(value) {
      console.log(value);

      value.rotation.x = THREE.Math.degToRad(-90);

      value.scale.x = scaleX;
      value.scale.y = scaleZ;
      value.scale.z = scaleY;

      value.position.y = positionY;

      value.name = "activeTile";
      scene.add(value);

      // Add the water
      /*
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({color: 0x57a3c6, side: THREE.DoubleSide});
      const activeWater = new THREE.Mesh(geometry, material);
      activeWater.rotation.x = THREE.Math.degToRad(90);
      activeWater.position.y = 0.00001;
      
      scene.add(activeWater);
      */
    },
    
    function(error) { 
      alert("A critical error occured. The page will now be refreshed."); 
      location.reload(); 
    }
  );
}

addTile(
  parseFloat(radius), 
  parseInt(resolution), 
  parseFloat(latCoord), 
  parseFloat(lonCoord), 
  1, 
  1, 
  1, 
  0
);

addTile(
  100, 
  10, 
  parseFloat(latCoord), 
  parseFloat(lonCoord), 
  10, 
  0, 
  10, 
  -0.05
);