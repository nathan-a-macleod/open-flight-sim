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
            color: params.colors[Math.floor(Math.random() * params.colors.length)], 
            alphaTest: 0.5, 
            transparent: true
        });
        material.opacity = params.opacity;

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

let colorsArr = [0xdddddd, 0xffffff];
if (parseInt(weather) > 50 ){
    colorsArr.push(0xaaaaaa);
    colorsArr.push(0x999999);
    colorsArr.push(0x777777);
}

let cloudLayer1 = addCloud({
    x: -2,
    y: 2,
    z: -3,
    pointsNum: parseInt(weather) * 400,
    cloudsNum: parseInt(weather) / 1.2,
    cloudPointDistance: 3,
    particleSize: 0.06,
    name: "cloudLayer1",
    colors: [0xffffff, 0xdddddd, 0xaaaaaa],
    opacity: 0.5 + Math.random() / 4
});

cloudLayer1.scale.x = 60;
cloudLayer1.scale.y = 2.5;
cloudLayer1.scale.z = 60;