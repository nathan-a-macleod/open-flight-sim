function addCloud(params){
    function addCloudPoint(){
        let xOffset = Math.random() * params.cloudPointDistance;
        let yOffset = Math.random() * params.cloudPointDistance;
        let zOffset = Math.random() * params.cloudPointDistance;

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < params.pointsNum; i++) {
            const x = params.x + Math.random() + Math.random() + xOffset;
            const y = params.y + Math.random() + Math.random() + yOffset;
            const z = params.z + Math.random() + Math.random() + zOffset;

            vertices.push(x, y, z);
        }

        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            size: params.particleSize,
            sizeAttenuation: true,
            color: 0xffffff, 
            alphaTest: 0.5, 
            transparent: true
        });
        material.opacity = params.opacity;
        material.color.setHSL( 1.0, 0.3, 0.7 );

        const particles = new THREE.Points(geometry, material);
        particles.scale.x = 0.2;
        particles.scale.y = 0.2;
        particles.scale.z = 0.2;

        scene.add(particles);  
        
        return particles;
    }

    let cloudGroup = new THREE.Group();
    cloudGroup.name = params.name;
    for(i=0; i<params.cloudsNum; i++){
        cloudGroup.add(addCloudPoint());
    }

    scene.add(cloudGroup);

    return cloudGroup;
}

let cloudLayer1 = addCloud({
    x: 0,
    y: 20,
    z: 0,
    pointsNum: 15000,
    cloudsNum: 15,
    cloudPointDistance: 3,
    particleSize: 0.01,
    name: "cloudLayer1",
    opacity: 0.5 + Math.random() / 4
});

cloudLayer1.scale.x = 6;
cloudLayer1.scale.y = 0.1;
cloudLayer1.scale.z = 6;