import '../style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


//     // BASIC SETUP 
const webGLContainer:HTMLCanvasElement = document.querySelector('.webGLContainer3')!
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,webGLContainer.clientWidth / webGLContainer.clientHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setClearColor(0x000000,0)
// const controls = new OrbitControls( camera, renderer.domElement );
renderer.setSize(webGLContainer.clientWidth, webGLContainer.clientHeight);
webGLContainer.appendChild(renderer.domElement)
camera.position.set(-10.0650,14.7443,0.5550)
camera.rotation.set(-1.4823,-0.8842,-1.4565)


const ambientLight = new THREE.AmbientLight(0xFFFFFF,.9)
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, .9)
directionalLight.position.set(1,.5, .5)
directionalLight.target.position.set(0,0,0)
scene.add(ambientLight)
scene.add(directionalLight)


//     // MAIN
const loader = new GLTFLoader();
loader.load(
  '/assets3d/astronaut-telescope.glb',
  function (gltf) {
    scene.add(gltf.scene);


    function handleMove(event:TouchEvent|MouseEvent) {
      event.preventDefault(); // Prevent scrolling on touch devices
      const normalizedX = event.type === 'touchmove' ? normalizeTouchPositionX(event as TouchEvent) : normalizeMousePositionX(event as MouseEvent);
      gltf.scene.rotation.y = Math.PI / 2 * normalizedX;
    }

    // Move model on mouse or touch move
    const container = document.querySelector('.webGLContainer3') as HTMLElement;
    container.addEventListener('mousemove', handleMove);
    container.addEventListener('touchmove', handleMove, { passive: false });


      //move model on mouse move
    document.addEventListener('mousemove', (event) => {
      const normalizedX = normalizeMousePositionX(event);
      gltf.scene.rotation.y = Math.PI / 2 * normalizedX;
    });



  },
  undefined,
  function (error) {
    console.error(error);
  }
);


      // ANIMATION AND RESIZE 
const animate = function () {
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate)

window.addEventListener('resize', ()=>{
    const width = webGLContainer.clientWidth;
    const height = webGLContainer.clientHeight;
    console.log(width)
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
})



    // UTILS
function normalizeMousePositionX(event:MouseEvent) {
  const screenWidth = window.innerWidth;
  const mouseX = event.clientX;
  const normalizedX = (mouseX - screenWidth/2) / (screenWidth/2);
  return normalizedX;
}

function normalizeTouchPositionX(event:TouchEvent) {
  const screenWidth = window.innerWidth;
  const touchX = event.touches[0].clientX;
  const normalizedX = (touchX - screenWidth/2) / (screenWidth/2);
  return normalizedX;
}
