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
        this.speed_to_units = 0.025;
        this.rollOffset = 0;
    }

    update(){
        // Rotate the camera based on user input
        this.rollOffset += Cesium.Math.toRadians(mousePos.x / 200);
        camera.setView({
            orientation: {
                heading : camera.heading + (this.rollOffset / 100),
                pitch : camera.pitch + Cesium.Math.toRadians(mousePos.y / 250),
                roll : camera.roll + Cesium.Math.toRadians(mousePos.x / 200)
            }
        });

        // Increase or decrease the speed based on 
        // whether you're accelerating towards or away from the ground
        if ((this.speed_to_units > 0.0075) && (this.speed_to_units < 0.04)) this.speed_to_units -= camera.pitch - 0.2 / 25;

        camera.moveForward(this.cruiseSpeed * (this.throttle * 0.01) * this.speed_to_units);
    }
}

let cessna172p = new Airplane(120);