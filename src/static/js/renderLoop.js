// Make the canvas adapt to changes in the size of windows
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let framerate = 60;

function render() {
  setTimeout(function(){
    requestAnimationFrame(render);
  }, 1000 / framerate);

  renderer.render(scene, camera);
 }

 render();