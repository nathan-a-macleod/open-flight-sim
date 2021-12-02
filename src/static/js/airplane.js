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

        // Add the throttle
        document.getElementById("airplaneUI").innerHTML = `
            <div id="throttle" class="UI">
                <input type="range" id="throttleInput" min=1 max=100 value=75>
            </div>
        `;
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
        // Set the throttle based on the UI
        let UIThrottleVal = parseInt(document.getElementById("throttleInput").value);
        let UIThrottle = document.getElementById("throttleInput");
        
        if (UIThrottleVal < this.throttle) this.throttle -= UIThrottleVal / 6;
        if (UIThrottleVal > this.throttle) this.throttle += UIThrottleVal / 60;
        if (this.throttle > 100) this.throttle = 100;
        if (this.throttle < 1) this.throttle = 1;

        // Adjust the UI based on user input
        if (pressedKey == 48) UIThrottle.value = 1;
        else if (pressedKey == 49) UIThrottle.value = 10;
        else if (pressedKey == 50) UIThrottle.value = 20;
        else if (pressedKey == 51) UIThrottle.value = 30;
        else if (pressedKey == 52) UIThrottle.value = 40;
        else if (pressedKey == 53) UIThrottle.value = 50;
        else if (pressedKey == 54) UIThrottle.value = 60;
        else if (pressedKey == 55) UIThrottle.value = 70;
        else if (pressedKey == 56) UIThrottle.value = 80;
        else if (pressedKey == 57) UIThrottle.value = 90;

        // Rotate the camera based on user input
        this.rollOffset += Cesium.Math.toRadians(mousePos.x / 400);
        this.updateYaw(this.rollOffset / 150);
        this.updatePitch(Cesium.Math.toRadians(mousePos.y / 500));
        this.updateRoll(Cesium.Math.toRadians(mousePos.x / 400));

        if (this.rollOffset >= Math.PI * 2){
            this.rollOffset = 0;

            camera.setView({
                orientation: {
                    heading: camera.heading,
                    pitch: camera.pitch,
                    roll: 0
                }
            });
        } else if (this.rollOffset <= -Math.PI * 2){
            this.rollOffset = 0;

            camera.setView({
                orientation: {
                    heading: camera.heading,
                    pitch: camera.pitch,
                    roll: 0
                }
            });
        }

        camera.moveForward(this.cruiseSpeed * (this.throttle * 0.01) * this.speed_to_units);
    }
}

let cessna172p = new Airplane(120);