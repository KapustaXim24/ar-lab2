import * as THREE from 'three';

// Обгортаємо весь код у подію DOMContentLoaded, щоб бути впевненими, що HTML готовий
document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        // 1. Ініціалізація MindAR
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.querySelector(".container"),
            imageTargetSrc: './targets.mind', // Явно вказуємо поточну папку
        });
        const { renderer, scene, camera } = mindarThree;

        // 2. Освітлення
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        directionalLight.position.set(0, 5, 10);
        scene.add(directionalLight);

        // 3. Створення 3D-моделі
        const cityCouncilComplex = new THREE.Group();
        const textureLoader = new THREE.TextureLoader();
        const brickTexture = textureLoader.load('./brick.jpg'); // Явно вказуємо поточну папку
        brickTexture.wrapS = THREE.RepeatWrapping;
        brickTexture.wrapT = THREE.RepeatWrapping;
        const brickMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });

        // Створення елементів (код той самий)
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
        
        cityCouncilComplex.scale.set(0.04, 0.04, 0.04);
        cityCouncilComplex.position.set(0, -0.4, 0);

        // 4. Прив'язка до якоря
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(cityCouncilComplex);

        // 5. Запуск AR
        await mindarThree.start();

        // 6. Цикл рендерингу
        renderer.setAnimationLoop(() => {
            cityCouncilComplex.rotation.y += 0.01;
            renderer.render(scene, camera);
        });
    }

    // Запускаємо тільки після того, як весь HTML-документ буде завантажено
    start();
});
