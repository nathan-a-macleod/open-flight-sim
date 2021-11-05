// ONLY FOR DEBBUGGING!
// https://mrdoob.github.io/stats.js/build/stats.min.js
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})();

let canvas = document.getElementById("mainCanvas");

let paused = true;

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x7FB7DB);
scene.fog = new THREE.Fog(0x79B2D8, 0, 10);

let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.001, 100000);
camera.position.y = 10;
camera.position.z = 10;

let renderer = new THREE.WebGLRenderer({
//    alpha: true, 
//    preserveDrawingBuffer: true, 
    antialias: true, 
    canvas: canvas
});

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.gammaFactor = 1;
renderer.outputEncoding = THREE.GammaEncoding;
renderer.physicallyCorrectLights;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//let controls = new THREE.OrbitControls(camera, renderer.domElement);

/*
// For debugging:
var geometry = new THREE.BoxGeometry(5, 5, 5, 5, 5, 5);
var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
*/

let sun = new THREE.DirectionalLight(0xcccccc);
sun.intensity = 1;
sun.position.set(1.5, 2, 6);
scene.add(sun);

function lon2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }
function tile2lon(x,z) {
  return (x/Math.pow(2,z)*360-180);
}
function tile2lat(y,z) {
  var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
  return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}
function widthCoord(zoomLevel){
  return 360 / Math.pow(2, zoomLevel);
}
