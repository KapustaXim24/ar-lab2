import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        // 1. Ініціалізація MindAR з контейнером та файлом маркера
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.querySelector(".container"),
            imageTargetSrc: 'targets.mind',
        });
        const { renderer, scene, camera } = mindarThree;

        // 2. Додавання освітлення до сцени
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        directionalLight.position.set(0, 5, 10);
        scene.add(directionalLight);

        // 3. Створення 3D-моделі
        
        const cityCouncilComplex = new THREE.Group();
        
        // Завантажувач текстури та матеріал для цегли
        const textureLoader = new THREE.TextureLoader();
        const brickTexture = textureLoader.load('brick.jpg');
        // Налаштування повторення текстури
        brickTexture.wrapS = THREE.RepeatWrapping;
        brickTexture.wrapT = THREE.RepeatWrapping;
        const brickMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });

        // Створення елементів будівлі
        // Основа
        const baseGeometry = new THREE.BoxGeometry(22, 2, 0.2);
        const baseMesh = new THREE.Mesh(baseGeometry, brickMaterial);
        baseMesh.position.set(0, 1, 0);
        cityCouncilComplex.add(baseMesh);

        // Ліва частина
        const leftPartGeometry = new THREE.BoxGeometry(4, 3, 0.2);
        const leftPartMesh = new THREE.Mesh(leftPartGeometry, brickMaterial);
        leftPartMesh.position.set(-9, 3.5, 0);
        cityCouncilComplex.add(leftPartMesh);

        // Центральна башта
        const centerTowerGeometry = new THREE.BoxGeometry(4, 6, 0.2);
        const centerTowerMesh = new THREE.Mesh(centerTowerGeometry, brickMaterial);
        centerTowerMesh.position.set(0, 4, 0);
        cityCouncilComplex.add(centerTowerMesh);

        // Права частина
        const rightPartGeometry = new THREE.BoxGeometry(4, 3, 0.2);
        const rightPartMesh = new THREE.Mesh(rightPartGeometry, brickMaterial);
        rightPartMesh.position.set(9, 2.5, 0);
        cityCouncilComplex.add(rightPartMesh);
        
        // Купол - виправлена версія
        const domeGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMaterial = new THREE.MeshStandardMaterial({ color: 0x666666, side: THREE.DoubleSide });
        const domeMesh = new THREE.Mesh(domeGeometry, domeMaterial);
        domeMesh.position.set(9, 4, 0);
        domeMesh.rotation.x = -Math.PI / 2; // Повертаємо, щоб зріз був внизу
        cityCouncilComplex.add(domeMesh);
        
        // Масштабуємо всю модель, щоб вона відповідала розміру маркера
        cityCouncilComplex.scale.set(0.04, 0.04, 0.04);
        // Позиціонуємо модель відносно центру маркера
        cityCouncilComplex.position.set(0, -0.4, 0);

        // 4. Прив'язка моделі до AR-якоря
        // `addAnchor(0)` означає прив'язати до першого (і єдиного) маркера
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(cityCouncilComplex);

        // 5. Запуск AR-рушія
        await mindarThree.start();

        // 6. Цикл рендерингу для анімації
        renderer.setAnimationLoop(() => {
            cityCouncilComplex.rotation.y += 0.01;
            renderer.render(scene, camera);
        });
    }

    start();
});
