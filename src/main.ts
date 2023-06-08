import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { cameraPositions } from './constants/cameraPositions'
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


    // BASIC SETUP 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({ alpha:true });
renderer.setClearColor(0x000000,0)
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.webGLContainer')!.appendChild(renderer.domElement)
camera.position.z = 5;
camera.position.set(cameraPositions['initial'].position.x,cameraPositions['initial'].position.y,cameraPositions['initial'].position.z)
camera.rotation.set(cameraPositions['initial'].rotation.x,cameraPositions['initial'].rotation.y,cameraPositions['initial'].rotation.z)

const ambientLight = new THREE.AmbientLight(0xFFFFFF,.9)
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, .9)
directionalLight.position.set(1,.5, .5)
directionalLight.target.position.set(0,0,0)
scene.add(ambientLight)
scene.add(directionalLight)

// const controls = new OrbitControls( camera, renderer.domElement );

    // MAIN
const loader = new GLTFLoader();
loader.load(
  '/assets3d/astronaut-pending.glb',
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// window.addEventListener('click', ()=>{
//   const cameraPos = [camera.position.x.toFixed(2),camera.position.y.toFixed(2),camera.position.z.toFixed(2)]
//   const cameraRot = [camera.rotation.x.toFixed(2),camera.rotation.y.toFixed(2),camera.rotation.z.toFixed(2)]
//   console.log(`position:${cameraPos}`)
//   console.log(`rotation:${cameraRot}`)
// })


    // GSAP CAMERA ANIMATION
const tl = gsap.timeline({ 
  defaults: { ease:"linear", duration:2 },
  scrollTrigger: {
    trigger: ".hero",
    start: '+20 top',
    end: 'bottom bottom',
    scrub:true,
  }

})
    
    Object.keys(cameraPositions).forEach((pos)=>{
      const current = cameraPositions[pos]
      tl.to(camera.position, {x:current.position.x,y:current.position.y,z:current.position.z}, current.startingTime)
      tl.to(camera.rotation, {x:current.rotation.x,y:current.rotation.y,z:current.rotation.z}, current.startingTime)
    })


      // ANIMATION AND RESIZE 
const animate = function () {
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate)

window.addEventListener('resize', ()=>{
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
})