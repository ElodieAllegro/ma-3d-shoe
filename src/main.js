import './style.css';
import * as THREE        from 'three';
import { GLTFLoader }    from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 0. Détection du device
let device; 
const updateDevice = () => {
  const w = window.innerWidth;
  if (w <= 767) device = 'mobile';
  else if (w <= 1024) device = 'tablet';
  else device = 'desktop';
};
updateDevice();

// Configuration caméra selon device
const CAMERA_SETTINGS = {
  desktop: { fov: 45, position: [2, 0, 0] },
  tablet:  { fov: 50, position: [2.5, 0, 0] },
  mobile:  { fov: 55, position: [3, 0, 0] },
};

// 1. Conteneur & scène
const container = document.getElementById('three-container');
const scene     = new THREE.Scene();

// 2. Création de la caméra adaptée
const camCfg = CAMERA_SETTINGS[device];
const camera = new THREE.PerspectiveCamera(
  camCfg.fov,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(...camCfg.position);

// 3. Renderer transparent + tone mapping
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
// bride le pixelRatio sur mobile pour plus de perf
renderer.setPixelRatio(device === 'mobile' ? 1 : window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);
renderer.outputEncoding         = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.toneMapping            = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure    = 1.8;
container.appendChild(renderer.domElement);

// 4. Lumières
scene.add(new THREE.AmbientLight(0xffffff, 1.5));
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.8);
hemi.position.set(0, 2, 0); scene.add(hemi);
const dir = new THREE.DirectionalLight(0xffffff, 1.5);
dir.position.set(3, 3, 3); scene.add(dir);
const frontLight = new THREE.DirectionalLight(0xffffff, 1);
frontLight.position.copy(camera.position); scene.add(frontLight);
const fillLight = new THREE.PointLight(0xffffff, 1);
fillLight.position.set(-2, 1, 2); scene.add(fillLight);
const backFill = new THREE.DirectionalLight(0xffffff, 3);
backFill.position.set(-camera.position.x, -camera.position.y, -camera.position.z);
scene.add(backFill);

// 5. Contrôles
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.dampingFactor  = 0.05;
controls.autoRotate     = false;
controls.enableRotate   = true;
controls.enableZoom     = true;
controls.enablePan      = false;

// Fonction pour adapter le zoom selon le device
function setZoomByDevice() {
  if (device === 'mobile') {
    controls.minDistance = 1.1; // plus proche
    controls.maxDistance = 1.7; // un peu de marge pour dézoomer
  } else if (device === 'tablet') {
    controls.minDistance = 1.5;
    controls.maxDistance = 3;
  } else {
    controls.minDistance = 1.5;
    controls.maxDistance = 5;
  }
}
setZoomByDevice();

// 6. Chargement du modèle
new GLTFLoader().load(
  'models/AF1.glb',
  gltf => {
    const model = gltf.scene;

// Auto-rotation du carrousel
setInterval(() => {
  rotateCarousel(1);
}, 4000);

// Rendre la fonction globale pour les boutons
window.rotateCarousel = rotateCarousel;


// Ajouter les event listeners pour les boutons
document.addEventListener('DOMContentLoaded', () => {
  const threeDPrevBtn = document.querySelector('.carousel-section .prev-btn');
  const threeDNextBtn = document.querySelector('.carousel-section .next-btn');
  
  if (threeDPrevBtn) {
    threeDPrevBtn.addEventListener('click', () => rotateCarousel(-1));
  }
  
  if (threeDNextBtn) {
    threeDNextBtn.addEventListener('click', () => rotateCarousel(1));
  }
  
  // Event listeners pour le carousel circulaire
  const brandPrevBtn = document.querySelector('.brand-selection-section .nav-btn.prev-btn');
  const brandNextBtn = document.querySelector('.brand-selection-section .nav-btn.next-btn');
  
  if (brandPrevBtn) {
    brandPrevBtn.addEventListener('click', () => rotateBrandSelection(-1));
  }
  
  if (brandNextBtn) {
    brandNextBtn.addEventListener('click', () => rotateBrandSelection(1));
  }
  
  // Clic sur les logos de marques
  const brandLogos = document.querySelectorAll('.brand-logo');
  brandLogos.forEach((logo, index) => {
    logo.addEventListener('click', () => selectBrand(index + 1));
  });
});