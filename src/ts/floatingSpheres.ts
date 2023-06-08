import '../style.css'
import * as THREE from 'three'

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// BASIC SETUP 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({ alpha:true });
renderer.setClearColor(0x000000,0)
// const controls = new OrbitControls( camera, renderer.domElement );
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.webGLContainer2')!.appendChild(renderer.domElement)
camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0xFFFFFF,.9)
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, .9)
directionalLight.position.set(1,.5, .5)
directionalLight.target.position.set(0,0,0)
scene.add(ambientLight)
scene.add(directionalLight)


// MAIN
const numSpheres = 10; // número de esferas a crear
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const matcapMaterial = new THREE.MeshMatcapMaterial({
    color: 0xffffff, 
    matcap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/matcaps/matcap-porcelain-white.jpg'), // textura de matcap
    transparent: true, 
    opacity: 0.8, 
  });
const spheres: any[] = []; // arreglo para almacenar las esferas
const minDist = 2; // distancia mínima entre esferas
const xRange = 8; // rango de coordenadas x permitido
const yRange = 8; // rango de coordenadas y permitido

for (let i = 0; i < numSpheres; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, matcapMaterial);
  
    // asignar una posición aleatoria a la esfera
    let spherePosition = new THREE.Vector3();
    let validPosition = false;
  
    while (!validPosition) {
        // let t = parseFloat((Math.random() * xRange - xRange / 2).toFixed(1))
      spherePosition.x = (Math.random() * xRange - xRange / 2);
      spherePosition.y = (Math.random() * yRange - yRange / 2);
      spherePosition.z = (Math.random() * -5);
  
      // verificar si la posición es válida
      if (spherePosition.x < -2 || spherePosition.x > 2 || spherePosition.y < -2 || spherePosition.y > 2) {
        let validPositionForAllSpheres = true;
  
        for (let j = 0; j < spheres.length; j++) {
          const dist = spheres[j].position.distanceTo(spherePosition);
  
          if (dist < minDist) {
            validPositionForAllSpheres = false;
            break;
          }
        }
  
        if (validPositionForAllSpheres) {
          validPosition = true;
        }
      }
    }
  
    sphere.position.copy(spherePosition);
    scene.add(sphere);
    spheres.push(sphere); // agregar la esfera al arreglo
  }

// gsap animation
spheres.forEach((sphere)=>{
    gsap.from(sphere.position, {
        y:-1,
        x:-1,
        z:0,
        duration:.3,
        scrollTrigger: {
          trigger: ".section1",
          start: 'top 20%',
          end: '50% 40%',
          toggleActions: 'play reverse play reverse',
          onLeave: () => {
            gsap.to(sphere.position, {
              y: 0,
              x:0,
              z:0,
            })
          }
        },
    })
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

  (spheres as any[]).forEach((sphere)=>{
    sphere.scale.x = width / window.innerWidth;
    sphere.scale.y = height / window.innerHeight;
  })
})