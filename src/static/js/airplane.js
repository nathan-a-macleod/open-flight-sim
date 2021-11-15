let mousePos = {
    x: 0,
    y: 0
}

document.body.addEventListener("mousemove", function(event){
    mousePos.x = event.clientX - (window.innerWidth / 2);
    mousePos.y = event.clientY - (window.innerHeight / 2);
});

class Airplane{
    constructor(cruiseSpeed){
        this.cruiseSpeed = cruiseSpeed;
        this.throttle = 75; // Percent
    }

    update(){
        // Rotate the camera
        camera.roll = Cesium.Math.toRadians(mousePos.x / 200);
        camera.pitch = Cesium.Math.toRadians(mousePos.y / 250);

        camera.moveForward(this.cruiseSpeed * (this.throttle * 0.01));
    }
}

let cessna172p = new Airplane(120);