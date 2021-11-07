document.getElementById("fog").style.display = "block";

function updateFog(){
    scene.fog = new THREE.Fog(
        0x79B2D8, 
        document.getElementById("fogStart").value, 
        document.getElementById("fogEnd").value
    );
}
document.getElementById("fogStart").addEventListener("change", function(){ updateFog() });
document.getElementById("fogEnd").addEventListener("change", function(){ updateFog() });