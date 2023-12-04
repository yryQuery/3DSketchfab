import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls} from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader} from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let controls;
let objToRender = 'donut';

const loader = new GLTFLoader();

loader.load(
    `models/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
        console.log("Object loaded and added to scene:", object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);
 const renderer = new THREE.WebGLRenderer({ alpha: true });
 renderer.setSize(window.innerWidth, window.innerHeight);

 document.getElementById('container3D').appendChild(renderer.domElement);
 camera.position.z = objToRender === "dino" ? 25 : 500 ;

 controls = new OrbitControls(camera, renderer.domElement);

 const topLight = new THREE.DirectionalLight(0xffffff , 1);
 topLight.position.set(500, 500, 500)
 topLight.castShadow = true;
 scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
scene.add(ambientLight);


let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", function (event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    // console.log("mousemove event:", mouseX, mouseY);
});

function animate() {
    requestAnimationFrame(animate);
    // console.log("mouseX:", mouseX, "mouseY:", mouseY);

    if (object && objToRender === "donut") {
        object.rotation.y = -3 + mouseX / window.innerWidth * 3;
        object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    }
    renderer.render(scene, camera);
}

window.addEventListener("resize",function () {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
