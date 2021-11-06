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
    
    let tileGeometry = new THREE.PlaneBufferGeometry(size, size, size, loops, loops, loops);
    let tileMaterial = new THREE.MeshBasicMaterial({map: texture, wireframe: false});
    let tile = new THREE.Mesh(tileGeometry, tileMaterial);
    tile.name = "tile";
    tile.position.x = lonOffset * size;
    tile.position.z = latOffset * size;
    tile.rotation.x += -Math.PI / 2;
    scene.add(tile);
    
    // Add elevation data to the tile
    let canv = document.createElement("canvas");

    document.body.appendChild(canv);
    let ctx = canv.getContext("2d");
    
    elevationImg = new Image();
    elevationImg.crossOrigin = "Anonymous";
    elevationImg.src = 'https://api.mapbox.com/v4/mapbox.terrain-rgb/' + 
        zoomLevel + 
        '/' + 
        parseInt(lon2tile(lonCoord, zoomLevel) + lonOffset) + 
        '/' + 
        parseInt(lat2tile(latCoord, zoomLevel) + latOffset) + 
        '@2x.jpg90?access_token=' +
        userAPIToken;

    elevationImg.onload = function(){
        let elevations = [];

        ctx.drawImage(elevationImg, 0, 0, loops, loops);

        for (let y = 0; y < loops; y++){
            for (let x = 0; x < loops; x++){
                let value = ctx.getImageData(x, y, 1, 1).data;
                let red = value[0];
                let green = value[1];
                let blue = value[2];

                let height = -10000 + ((red * 256 * 256 + green * 256 + blue) * 0.1);

                elevations.push(height);
            }
        }

        let iterationNum = 0;
        for (let i = 0; i < tileGeometry.attributes.position.array.length; i++){
            //let vertex = tileGeometry.attributes.position.array[i];
            //vertex = Math.random() * 10;
            //tileGeometry.getAttribute('position').array[i] += elevations[i / 3] / 1000;
            
            tileGeometry.attributes.position.array[i * 3 + 2] = elevations[iterationNum] / 1000;
            iterationNum++;
        }

        tileGeometry.getAttribute("position").needsUpdate = true;

        canv.parentElement.removeChild(canv);
        canv = "";
        ctx = "";
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

addTerrainTileGrid9(14, 10, 0, 0, 15);
//addTerrainTile(14, 10, 0, 0, 15)