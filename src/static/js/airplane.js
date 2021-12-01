mousePos = {
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
        this.speed_to_units = 0.025;
        this.rollOffset = 0;
    }

    updateYaw(yawChange){
        camera.setView({
            orientation: {
                heading: camera.heading + yawChange,
                pitch: camera.pitch,
                roll: camera.roll
            }
        });
    }

    updatePitch(pitchChange){
        camera.setView({
            orientation: {
                heading: camera.heading,
                pitch: camera.pitch + pitchChange,
                roll: camera.roll
            }
        });
    }

    updateRoll(rollChange){
        camera.setView({
            orientation: {
                heading: camera.heading,
                pitch: camera.pitch,
                roll: camera.roll + rollChange
            }
        });
    }

    update(){
        // Rotate the camera based on user input
        this.rollOffset += Cesium.Math.toRadians(mousePos.x / 400);
        this.updateYaw(this.rollOffset / 100);
        this.updatePitch(Cesium.Math.toRadians(mousePos.y / 500));
        this.updateRoll(Cesium.Math.toRadians(mousePos.x / 400));

        camera.moveForward(this.cruiseSpeed * (this.throttle * 0.01) * this.speed_to_units);
    }
}

let cessna172p = new Airplane(120);