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
        this.speed_to_units = 0.03;
    }

    update(){
        // Rotate the camera
        //camera.twistRight(Cesium.Math.toRadians(mousePos.x / 200));
        //camera.lookUp(Cesium.Math.toRadians(mousePos.y / 250));
        camera.setView({
            orientation: {
                heading : camera.heading,
                pitch : camera.pitch + Cesium.Math.toRadians(mousePos.y / 250),
                roll : camera.roll + Cesium.Math.toRadians(mousePos.x / 200)
            }
        });

        camera.moveForward(this.cruiseSpeed * (this.throttle * 0.01) * this.speed_to_units);
    }
}

let cessna172p = new Airplane(120);