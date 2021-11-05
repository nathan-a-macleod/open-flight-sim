// https://www.mapbox.com/blog/global-elevation-data

function addTerrainTile(zoomLevel, size, lonOffset, latOffset, loops){
    let tileWidth = tile2lon(lonCoord, zoomLevel) - tile2lon(lonCoord + lonOffset, zoomLevel);
    let tileWidthLoops = tile2lon(lonCoord, zoomLevel) - tile2lon(lonCoord + lonOffset, zoomLevel) / loops;
    
    const texture = new THREE.TextureLoader().load(
        'https://api.mapbox.com/v4/mapbox.satellite/' + 
        zoomLevel + 
        '/' + 
        parseInt(lon2tile(lonCoord, zoomLevel) + lonOffset) + 
        '/' + 
        parseInt(lat2tile(latCoord, zoomLevel) + latOffset) + 
        '@2x.jpg90?access_token=' +
        userAPIToken
    );
    
    let tileGeometry = new THREE.PlaneGeometry(size, size, size, loops, loops, loops);
    let tileMaterial = new THREE.MeshBasicMaterial({map: texture, wireframe: false});
    let tile = new THREE.Mesh(tileGeometry, tileMaterial);
    tile.name = "tile";
    tile.position.x = lonOffset * size;
    tile.position.z = latOffset * size;
    tile.rotation.x += -Math.PI / 2;
    scene.add(tile);
    
    for (let i = 1; i < tileGeometry.attributes.position.array.length; i+=3){
        
    }
}

function addTerrainTileGrid9(zoomLevel, tileSize, lonOffset, latOffset, loops){
  lonOffset *= 3;
  latOffset *= 3;
  addTerrainTile(zoomLevel, tileSize, -1 + lonOffset, -1 + latOffset, loops);
  addTerrainTile(zoomLevel, tileSize, 0 + lonOffset, -1 + latOffset, loops);
  addTerrainTile(zoomLevel, tileSize, +1 + lonOffset, -1 + latOffset, loops);
  
  addTerrainTile(zoomLevel, tileSize, -1 + lonOffset, 0 + latOffset, loops);
  addTerrainTile(zoomLevel, tileSize, 0 + lonOffset, 0 + latOffset, loops);
  addTerrainTile(zoomLevel, tileSize, +1 + lonOffset, 0 + latOffset, loops);
  
  addTerrainTile(zoomLevel, tileSize, -1 + lonOffset, 1 + latOffset, loops);
  addTerrainTile(zoomLevel, tileSize, 0 + lonOffset, 1 + latOffset, loops);
  addTerrainTile(zoomLevel, tileSize, +1 + lonOffset, 1 + latOffset, loops);
}

//addTerrainTileGrid9(14, 15, 0, 0, 4);
addTerrainTile(14, 10, 0, 0, 10)