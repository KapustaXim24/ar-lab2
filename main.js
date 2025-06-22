import * as THREE from 'three';

// 1. Створення сцени, камери та рендерера
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xADF4FF); // Колір фону як в a-scene

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Освітлення
const ambientLight = new THREE.AmbientLight(0xCCCCCC); // <a-light type="ambient" color="#CCC">
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8); // <a-light type="directional" intensity="0.8">
directionalLight.position.set(0, 5, 10);
scene.add(directionalLight);

// 3. Створення геометрії та матеріалів
// Завантажувач текстур
const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load('brick.jpg');
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;

const brickMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });

// Створюємо групу, щоб керувати всіма частинами будівлі разом
const cityCouncilComplex = new THREE.Group();
scene.add(cityCouncilComplex);
cityCouncilComplex.position.set(0, 0, -15); // <a-entity position="0 0 -15">

// Перетворюємо кожен <a-box> і <a-sphere> на об'єкти Three.js

// a-box 1 (основа)
brickTexture.repeat.set(11, 1);
const baseGeometry = new THREE.BoxGeometry(22, 2, 0.2);
const baseMesh = new THREE.Mesh(baseGeometry, brickMaterial.clone()); // Клонуємо, щоб мати унікальні налаштування repeat
baseMesh.material.map.repeat.set(11, 1);
baseMesh.position.set(0, 1, 0);
cityCouncilComplex.add(baseMesh);

// a-box 2 (ліва частина)
const leftPartGeometry = new THREE.BoxGeometry(4, 3, 0.2);
const leftPartMesh = new THREE.Mesh(leftPartGeometry, brickMaterial.clone());
leftPartMesh.material.map.repeat.set(2, 1.5);
leftPartMesh.position.set(-9, 3.5, 0);
cityCouncilComplex.add(leftPartMesh);

// a-box 3 (центральна башта)
const centerTowerGeometry = new THREE.BoxGeometry(4, 6, 0.2);
const centerTowerMesh = new THREE.Mesh(centerTowerGeometry, brickMaterial.clone());
centerTowerMesh.material.map.repeat.set(2, 3);
centerTowerMesh.position.set(0, 4, 0);
cityCouncilComplex.add(centerTowerMesh);

// a-box 4 (права частина)
const rightPartGeometry = new THREE.BoxGeometry(4, 3, 0.2);
const rightPartMesh = new THREE.Mesh(rightPartGeometry, brickMaterial.clone());
rightPartMesh.material.map.repeat.set(2, 1.5);
rightPartMesh.position.set(9, 2.5, 0);
cityCouncilComplex.add(rightPartMesh);

// a-sphere (купол)
const domeGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2); // theta-length="180" -> півсфера
const domeMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
const domeMesh = new THREE.Mesh(domeGeometry, domeMaterial);
domeMesh.position.set(9, 4, 0);
domeMesh.rotation.x = -Math.PI / 2; // Повертаємо, щоб вона була зверху
cityCouncilComplex.add(domeMesh);

// 4. Налаштування камери
camera.position.set(0, 4, 12); // Початкова позиція камери
camera.lookAt(cityCouncilComplex.position); // Камера дивиться на центр сцени

// 5. Анімація
const clock = new THREE.Clock(); // Годинник для плавної анімації

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Анімація камери, що імітує рух туди-сюди
    // Math.sin дає значення від -1 до 1. Ми його масштабуємо.
    camera.position.z = 12 + Math.sin(elapsedTime * 0.5) * 10;
    
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate); // Запускаємо цикл анімації

// Обробник зміни розміру вікна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
