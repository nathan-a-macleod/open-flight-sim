// Make the canvas adapt to changes in the size of windows
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
function render() {
    requestAnimationFrame(render);
    
    renderer.render(scene, camera);
 }

 render();