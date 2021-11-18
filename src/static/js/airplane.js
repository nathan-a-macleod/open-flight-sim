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
        this.speed_to_units = 0.020;
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
        this.rollOffset += Cesium.Math.toRadians(mousePos.x / 200);
        this.updateYaw(this.rollOffset / 100);
        this.updatePitch(Cesium.Math.toRadians(mousePos.y / 250));
        this.updateRoll(Cesium.Math.toRadians(mousePos.x / 200));

        // Increase or decrease the speed based on 
        // whether you're accelerating towards or away from the ground
        if ((this.speed_to_units > 0.0075) && (this.speed_to_units < 0.04)) this.speed_to_units -= camera.pitch - 0.2 / 25;

        camera.moveForward(this.cruiseSpeed * (this.throttle * 0.01) * this.speed_to_units);
    }
}

let cessna172p = new Airplane(120);