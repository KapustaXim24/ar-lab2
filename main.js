import * as THREE from 'three';

// --- НАЛАШТУВАННЯ ---
// 1. Знаходимо наш canvas в HTML
const canvas = document.querySelector('#vr-canvas');

// 2. Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xADF4FF);

// 3. Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 4, 12);
camera.lookAt(new THREE.Vector3(0, 0, -15));

// 4. Рендерер
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, // Прив'язуємо рендерер до нашого canvas
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight); // Встановлюємо розмір на все вікно

// --- ОБ'ЄКТИ СЦЕНИ ---
// 5. Освітлення
const ambientLight = new THREE.AmbientLight(0xCCCCCC);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
directionalLight.position.set(0, 5, 10);
scene.add(directionalLight);

// 6. Створення будівлі (ваш код без змін)
const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load('./brick.jpg'); // Додав ./
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;
const brickMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });

const cityCouncilComplex = new THREE.Group();
scene.add(cityCouncilComplex);
cityCouncilComplex.position.set(0, 0, -15);

const baseGeometry = new THREE.BoxGeometry(22, 2, 0.2);
const baseMesh = new THREE.Mesh(baseGeometry, brickMaterial);
baseMesh.position.set(0, 1, 0);
cityCouncilComplex.add(baseMesh);

const leftPartGeometry = new THREE.BoxGeometry(4, 3, 0.2);
const leftPartMesh = new THREE.Mesh(leftPartGeometry, brickMaterial);
leftPartMesh.position.set(-9, 3.5, 0);
cityCouncilComplex.add(leftPartMesh);

const centerTowerGeometry = new THREE.BoxGeometry(4, 6, 0.2);
const centerTowerMesh = new THREE.Mesh(centerTowerGeometry, brickMaterial);
centerTowerMesh.position.set(0, 4, 0);
cityCouncilComplex.add(centerTowerMesh);

const rightPartGeometry = new THREE.BoxGeometry(4, 3, 0.2);
const rightPartMesh = new THREE.Mesh(rightPartGeometry, brickMaterial);
rightPartMesh.position.set(9, 2.5, 0);
cityCouncilComplex.add(rightPartMesh);

const domeGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
const domeMaterial = new THREE.MeshStandardMaterial({ color: 0x666666, side: THREE.DoubleSide });
const domeMesh = new THREE.Mesh(domeGeometry, domeMaterial);
domeMesh.position.set(9, 4, 0);
domeMesh.rotation.x = -Math.PI / 2;
cityCouncilComplex.add(domeMesh);

// --- АНІМАЦІЯ ТА ОБРОБНИКИ ---
// 7. Обробник зміни розміру вікна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 8. Цикл анімації
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    camera.position.z = 12 + Math.sin(elapsedTime * 0.5) * 10;
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick); // Використовуємо стандартний requestAnimationFrame
}

tick();
