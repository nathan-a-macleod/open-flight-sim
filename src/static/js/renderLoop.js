// Make the canvas adapt to changes in the size of windows
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let framerate = 60;

let option = 1;
function render() {
  setTimeout(function(){
    requestAnimationFrame(render);
  }, 1000 / framerate);
  
  if (option >= 100) option = -1;
  if (option <= -100) option = 1;

  if (option >= 0){
    cloudLayer1.scale.x += 0.5;
    option++;
  } else {
    cloudLayer1.scale.x -= 0.5;
    option--;
  }
  
  renderer.render(scene, camera);
 }

 render();