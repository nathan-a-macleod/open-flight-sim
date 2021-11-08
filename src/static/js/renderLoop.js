// Make the canvas adapt to changes in the size of windows
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let framerate = 60;
document.getElementById("fps60").addEventListener("click", function(){ framerate = 60 });
document.getElementById("fps48").addEventListener("click", function(){ framerate = 48 });
document.getElementById("fps30").addEventListener("click", function(){ framerate = 30 });
document.getElementById("fps24").addEventListener("click", function(){ framerate = 24 });
  
function render() {
  setTimeout(function(){
    requestAnimationFrame(render);
  }, 1000 / framerate);
    
  renderer.render(scene, camera);
 }

 render();