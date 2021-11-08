let cloudNum = 0;

function addCloud(param){
    cloudNum++;

    function addCloudPoint(){
        let xOffset = Math.random() * param.cloudPointDistance;
        let yOffset = Math.random() * param.cloudPointDistance;
        let zOffset = Math.random() * param.cloudPointDistance;

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < param.pointsNum; i++) {
            const x = param.x + Math.random() + Math.random() + xOffset;
            const y = param.y + Math.random() + Math.random() + yOffset;
            const z = param.z + Math.random() + Math.random() + zOffset;

            vertices.push(x, y, z);
        }

        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            size: param.particleSize,
            sizeAttenuation: true,
            color: 0xffffff, 
            alphaTest: 0.5, 
            transparent: true
        });
        material.opacity = param.opacity;
        material.color.setHSL( 1.0, 0.3, 0.7 );

        const particles = new THREE.Points( geometry, material );
        particles.scale.x = 0.2;
        particles.scale.y = 0.2;
        particles.scale.z = 0.2;

        scene.add(particles);  
        
        return particles;
    }

    let cloudGroup = new THREE.Group();
    cloudGroup.name = "cloud" + cloudNum;
    for(i=0; i<param.cloudsNum; i++){
        cloudGroup.add(addCloudPoint());
    }

    scene.add(cloudGroup);

    return cloudGroup;
}

let cloudLayer1 = addCloud({
    x: 0,
    y: 0,
    z: 0,
    pointsNum: 8000,
    cloudsNum: 15,
    cloudPointDistance: 4,
    particleSize: 0.008,
    opacity: 0.5 + Math.random() / 4
});

cloudLayer1.scale.x = 2;
cloudLayer1.scale.y = 0.1;
cloudLayer1.scale.z = 2;