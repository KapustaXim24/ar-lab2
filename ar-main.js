import * as THREE from 'three';

// Чекаємо, поки DOM буде готовий
document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        // 1. Ініціалізація MindAR, яка створить сцену, камеру і рендерер
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.querySelector(".container"),
            imageTargetSrc: 'targets.mind', // наш скомпільований маркер
        });
        const {renderer, scene, camera} = mindarThree;

        // 2. Освітлення (код такий самий, як у VR)
        const ambientLight = new THREE.AmbientLight(0xCCCCCC);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        directionalLight.position.set(0, 5, 10);
        scene.add(directionalLight);

        // 3. Створення об'єкта (код майже такий самий, але без позиції)
        const textureLoader = new THREE.TextureLoader();
        const brickTexture = textureLoader.load('brick.jpg');
        const brickMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });
        
        const cityCouncilComplex = new THREE.Group();
        
        // a-box 1
        const baseGeometry = new THREE.BoxGeometry(22, 2, 0.2);
        const baseMesh = new THREE.Mesh(baseGeometry, brickMaterial.clone());
        baseMesh.material.map.repeat.set(11, 1);
        baseMesh.position.set(0, 1, 0);
        cityCouncilComplex.add(baseMesh);

        // a-box 2
        const leftPartGeometry = new THREE.BoxGeometry(4, 3, 0.2);
        const leftPartMesh = new THREE.Mesh(leftPartGeometry, brickMaterial.clone());
        leftPartMesh.material.map.repeat.set(2, 1.5);
        leftPartMesh.position.set(-9, 3.5, 0);
        cityCouncilComplex.add(leftPartMesh);

        // a-box 3
        const centerTowerGeometry = new THREE.BoxGeometry(4, 6, 0.2);
        const centerTowerMesh = new THREE.Mesh(centerTowerGeometry, brickMaterial.clone());
        centerTowerMesh.material.map.repeat.set(2, 3);
        centerTowerMesh.position.set(0, 4, 0);
        cityCouncilComplex.add(centerTowerMesh);

        // a-box 4
        const rightPartGeometry = new THREE.BoxGeometry(4, 3, 0.2);
        const rightPartMesh = new THREE.Mesh(rightPartGeometry, brickMaterial.clone());
        rightPartMesh.material.map.repeat.set(2, 1.5);
        rightPartMesh.position.set(9, 2.5, 0);
        cityCouncilComplex.add(rightPartMesh);

        // a-sphere
        const domeGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
        const domeMesh = new THREE.Mesh(domeGeometry, domeMaterial);
        domeMesh.position.set(9, 4, 0);
        domeMesh.rotation.x = -Math.PI / 2;
        cityCouncilComplex.add(domeMesh);

        // ВАЖЛИВО: Масштабуємо нашу модель
        // Розмір маркера по ширині = 1. Наша модель має ширину ~22. 
        // Зробимо її набагато меншою, щоб вона вмістилася на маркер.
        cityCouncilComplex.scale.set(0.05, 0.05, 0.05);
        cityCouncilComplex.position.set(0, -0.5, 0); // Трохи опустимо, щоб була по центру маркера

        // 4. Прив'язка об'єкта до маркера
        // `addAnchor(0)` означає прив'язати до першого маркера у файлі targets.mind
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(cityCouncilComplex);

        // 5. Запуск AR
        await mindarThree.start();

        // 6. Цикл рендерингу
        renderer.setAnimationLoop(() => {
            // Тут можна додати анімацію, наприклад, обертання
            cityCouncilComplex.rotation.y += 0.005;
            renderer.render(scene, camera);
        });
    }
    start();
});
