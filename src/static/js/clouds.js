let cloudNum = 0;

function addCloud(param){
    cloudNum++;

    function addCloudPoint(){
        let xOffset = Math.random() * 2;
        let yOffset = Math.random() * 2;
        let zOffset = Math.random() * 2;

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < param.pointsNum; i++) {
            const x = param.x + Math.random() + xOffset + (Math.random() * 1);
            const y = param.y + Math.random() + yOffset + (Math.random() * 1);
            const z = param.z + Math.random() + zOffset + (Math.random() * 1);

            vertices.push(x, y, z);
        }

        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            size: 0.004,
            sizeAttenuation: true,
            color: 0xffffff, 
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
    pointsNum: 10000,
    cloudsNum: 15,
    opacity: 0.5 + Math.random() / 4
});