let cloudNum = 0;

function addCloud(param){
    cloudNum++;

    function addCloudPoint(){
        let xOffset = Math.random() * 14;
        let yOffset = Math.random() * 14;
        let zOffset = Math.random() * 14;

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        const sprite = new THREE.TextureLoader().load("/static/assets/cloud1.png");

        for (let i = 0; i < param.pointsNum; i++) {
            const x = param.x + Math.random() + xOffset / 8;
            const y = param.y + Math.random() + yOffset / 8;
            const z = param.z + Math.random() + zOffset / 8;

            vertices.push(x, y, z);
        }

        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            size: 0.06,
            sizeAttenuation: true,
            map: sprite, 
            alphaTest: 0.5, 
            transparent: true
        });
        material.opacity = param.opacity;
        material.color.setHSL( 1.0, 0.3, 0.7 );

        const particles = new THREE.Points( geometry, material );
        particles.name = "cloud" + cloudNum;
        particles.scale.x = 0.2;
        particles.scale.y = 0.2;
        particles.scale.z = 0.2;

        scene.add(particles);   
    }

    for(i=0; i<param.cloudsNum; i++){
        addCloudPoint();
    }
}

addCloud({
    x: 0,
    y: 0,
    z: 0,
    pointsNum: 200,
    cloudsNum: 10,
    opacity: 0.5
});