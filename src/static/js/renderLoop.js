function render(){
    requestAnimationFrame(render);

    // Handle pausing of the game
    if (pressedKey == 80){
        if (paused == true){
            paused = false;
            document.getElementById("pauseBtn").innerHTML = '"p" to pause';
            document.getElementById("pauseMenu").style.display = "none";
            document.getElementById("airplaneUI").style.display = "block";

            cessna172p.rollOffset = 0;
            camera.setView({
                orientation: {
                    heading: camera.heading,
                    pitch: camera.pitch,
                    roll: 0
                }
            });
        } else {
            paused = true;
            document.getElementById("pauseBtn").innerHTML = '"p" to unpause';
            document.getElementById("pauseMenu").style.display = "block";
            document.getElementById("airplaneUI").style.display = "none";
        }

        pressedKey = null;
    }

    if (paused == false){
        cessna172p.update();
    }
}

render();