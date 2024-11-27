import './style.css'
import * as THREE from 'three/tsl'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { Terrain } from './terrain'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
const gui = new GUI()
const stats = new Stats()
document.body.appendChild(stats.dom)


const renderer = new THREE.WebGPURenderer({ antialias: true })
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))
const frustumSize = 500;
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
  0.5 * frustumSize * aspect / - 30, 
  0.5 * frustumSize * aspect / 30, 
  frustumSize / 30, 
  frustumSize / - 30, 
  635, 
  650,
);
camera.position.z   
 = 153;
 camera.position.x   
 = 149;
 camera.position.y   
 = 600;
scene.add(camera);


const controls = new OrbitControls(camera, renderer.domElement)
controls.update

const Sun = new THREE.DirectionalLight();
Sun.position.set(1, 2, 3);
scene.add(Sun);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);







const terrain = new Terrain(10, 10);
scene.add (terrain);
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', -1, 350),
cameraFolder.add(camera.position, 'y', -1, 800),
cameraFolder.add(camera.position, 'x', -1, 750),

cameraFolder.open()

function animate() {
  requestAnimationFrame(animate)
  controls.update
renderer.render(scene, camera)

  stats.update()
}

const terrainFolder = gui.addFolder('Terrain')
terrainFolder.add(terrain, 'width', 1, 20, 1).name('Width')
terrainFolder.add(terrain, 'height', 1, 20, 1).name('Height')
terrainFolder.addColor(terrain.material, 'color').name('Color')
terrainFolder.onChange()
terrainFolder.open()

            
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('three/examples/jsm/libs/draco/');
let ground;
loader.load(
    './models/gltf/capilla/ground.glb', // Replace with the path to your shiba model
    function (gltf) {
        ground = gltf.scene;
        scene.add(ground);
        gltf.scene.position.set(10, 0, 0);
        ground.traverse(child => {
          if (child.isMesh){
            
            child.material.needsUpdate = true;
          }
          
        })
    },
    undefined,
    function (error) {
        console.error(error);
    }
);


                
