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

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	edgesMesh.rotation.x += 0.01;
	edgesMesh.rotation.y += 0.01;

	renderer.render( scene, camera );
}