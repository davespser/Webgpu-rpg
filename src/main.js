import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { Terrain } from './terrain';
import { GLTFLoader } from './src/Loaders/GLTFLoader.js';
import { DRACOLoader } from './src/Loaders/DRACOLoader';

// GUI y Stats
const gui = new GUI();
const stats = new Stats();
document.body.appendChild(stats.dom);

// Renderer
const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Escena
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

// Cámara
const frustumSize = 500;
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
  0.5 * frustumSize * aspect / -30,
  0.5 * frustumSize * aspect / 30,
  frustumSize / 30,
  frustumSize / -30,
  635,
  650
);
camera.position.set(149, 600, 153);
scene.add(camera);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);

// Iluminación
const Sun = new THREE.DirectionalLight();
Sun.position.set(1, 2, 3);
scene.add(Sun);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

// Añadir luz hemisférica
const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1); // sky color, ground color, intensity
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

// Terreno
const terrain = new Terrain(10, 10);
scene.add(terrain);

// GUI para cámara
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', -1, 350).name('Z');
cameraFolder.add(camera.position, 'y', -1, 800).name('Y');
cameraFolder.add(camera.position, 'x', -1, 750).name('X');
cameraFolder.open();

// Animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  stats.update();
}
animate();

// GUI para terreno
const terrainFolder = gui.addFolder('Terrain');
terrainFolder.add(terrain, 'width', 1, 20, 1).name('Width');
terrainFolder.add(terrain, 'height', 1, 20, 1).name('Height');
terrainFolder.open();

// Carga de modelo GLTF con Draco
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('three/examples/jsm/libs/draco/');
loader.setDRACOLoader(dracoLoader);

loader.load(
  './models/gltf/capilla/capilla2.gltf',  // Asegúrate de que la ruta sea correcta
  function (gltf) {
    console.log('Modelo GLB cargado:', gltf); // Verifica que el modelo se ha cargado
    const ground = gltf.scene;
    scene.add(ground);
    ground.position.set(0, 1, 0); // Coloca el modelo en el centro de la escena

    // Forzar materiales básicos para ver si el modelo tiene mallas
    ground.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  // Material básico para pruebas
        console.log('Malla del modelo:', child); // Verifica las mallas del modelo
      }
    });
  },
  undefined,
  function (error) {
    console.error('Error al cargar el modelo:', error);
  }
);
