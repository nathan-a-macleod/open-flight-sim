function render(){
    requestAnimationFrame(render);

    // Handle pausing of the game
    if (pressedKey == 27){
        if (paused == true){
            paused = false;
            document.getElementById("pauseMenu").style.display = "none";
        } else {
            paused = true;
            document.getElementById("pauseMenu").style.display = "block";
        }
    }

    if (paused == false){
        cessna172p.update();
    }
}

render();