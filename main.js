import * as THREE from "./three.js/build/three.module.js";

const panoramaImage = new PANOLENS.ImagePanorama("./images/pic1.jpg");
const imageContainer = document.querySelector(".image-container");

const viewer = new PANOLENS.Viewer({
  container: imageContainer,
  autoRotate: true,
  autoRotateSpeed: 0.3,
  controlBar: false,
});

viewer.add(panoramaImage);

const ASPECT = window.innerWidth / window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, ASPECT, 1, 1000);
camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);

scene.add(camera)

var img = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture('./images/cowo.png')
});
img.map.needsUpdate = true;

var plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200),img);
plane.overdraw = true;
scene.add(plane);

var ambientLight = new THREE.AmbientLight('#0x55555');
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight('0xffffff');
directionalLight.position.set(1,1,1).normalize();
scene.add(directionalLight);

// set renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.onload = () => {
  console.log("page loaded");
  animate();
}