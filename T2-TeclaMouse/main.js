import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const cubo = new THREE.BoxGeometry( 1, 1, 1 );
const edges = new THREE.EdgesGeometry(cubo);

const material = [
  new THREE.MeshBasicMaterial({color: 0xff0000}),                 // vermelho
  new THREE.MeshBasicMaterial({color: 0x00ff00}),                 // verde
  new THREE.MeshBasicMaterial({color: 0x0000ff}),                 // azul  
  new THREE.MeshBasicMaterial({color: new THREE.Color(1, 1, 0)}), // amarelo 
  new THREE.MeshBasicMaterial({color: new THREE.Color(1, 0, 1)}), // rosa 
  new THREE.MeshBasicMaterial({color: new THREE.Color(0, 1, 1)})  // ciano
];

const edgesMaterial = new THREE.LineBasicMaterial({color: new THREE.Color(1, 1, 1)});
const edgesMesh = new THREE.LineSegments(edges, edgesMaterial);
scene.add(edgesMesh);

const cube = new THREE.Mesh( cubo, material );
scene.add( cube );

camera.position.z = 5;

// Variáveis para controle
let moveSpeed = 0.5;  // Velocidade de movimento do cubo
let isMouseDown = false;  // Verifica se o botão do mouse está pressionado
let normalScale = { x: 1, y: 1, z: 1 };

// Função de animação
function animate() {
    // Rotacão do cubo e arestas
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    edgesMesh.rotation.x += 0.01;
    edgesMesh.rotation.y += 0.01;

    // Se o mouse estiver pressionado, aumenta o tamanho do cubo
    if (isMouseDown) {
        cube.scale.set(1.5, 1.5, 1.5);
        edgesMesh.scale.set(1.5,1.5,1.5);
    } else {
        cube.scale.set(normalScale.x, normalScale.y, normalScale.z);  // Volta ao tamanho normal
        edgesMesh.scale.set(normalScale.x, normalScale.y, normalScale.z); 
    }

    renderer.render(scene, camera);
}

// Eventos de teclado
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':  // W: move pra cima
            cube.position.y += moveSpeed;
            edgesMesh.position.y += moveSpeed;
            break;
        case 's':  // S: move pra baixo
            cube.posision.y -= moveSpeed;
            edgesMesh.position.y -= moveSpeed;
            break;
        case 'a':  // A: move pra esquerda
            cube.position.x -= moveSpeed;
            edgesMesh.position.x -= moveSpeed;
            break;
        case 'd':  // D: move pra direita
            cube.position.x += moveSpeed;
            edgesMesh.position.x += moveSpeed;
            break;
    }
});

// Evento de mouse para aumentar e reduzir o cubo
window.addEventListener('mousedown', () => {
    isMouseDown = true;  // Mouse pressionado
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;  // Mouse solto
});

// Responsividade
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
