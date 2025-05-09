import * as THREE from 'three';
import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const branchMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.4, roughness: 0.6 });
const leafMaterial = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.2 });

const branchGeometry = new THREE.CylinderGeometry(0.02, 0.02, 2, 32);
const branch = new THREE.Mesh(branchGeometry, branchMaterial);
branch.rotation.z = Math.PI / 2;
scene.add(branch);

const leafGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const leaves = [];

for (let i = -0.8; i <= 0.8; i += 0.4) {
  const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
  leaf.position.set(i, Math.random() * 0.3 - 0.15, 0);
  leaf.scale.set(0.01, 0.01, 0.01); // hidden initially
  scene.add(leaf);
  leaves.push(leaf);
}

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

gsap.to(leaves.map(l => l.scale), {
  duration: 1.5,
  x: 1, y: 1, z: 1,
  stagger: 0.2,
  ease: 'power2.out',
  onComplete: () => {
    document.getElementById('brand-text').style.opacity = 1;
  }
});
