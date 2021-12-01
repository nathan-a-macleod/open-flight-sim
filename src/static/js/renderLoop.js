function render(){
    requestAnimationFrame(render);

    // Handle pausing of the game
    if (pressedKey == 27){
        if (paused == true){
            paused = false;
            document.getElementById("pauseBtn").innerHTML = '"esc" to pause';
            document.getElementById("pauseMenu").style.display = "none";
        } else {
            paused = true;
            document.getElementById("pauseBtn").innerHTML = '"esc" to unpause';
            document.getElementById("pauseMenu").style.display = "block";
        }

        pressedKey = null;
    }

    if (paused == false){
        cessna172p.update();
    }
}

render();