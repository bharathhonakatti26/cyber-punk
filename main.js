import "./style.css"; 
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";

// Scene
const scene = new THREE.Scene();

// PerspectiveCamera(fov(field of view), aspect(window.innerWidth / window.innerHeight), near, far)
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 14;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    antialias: true,
    alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.LinearToneMapping; // Simpler tone mapping
renderer.toneMappingExposure = 1.9;
renderer.outputEncoding = THREE.sRGBEncoding;

// PMREM Generator
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileCubemapShader();

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let model;

// Load HDRI
const rgbeLoader = new RGBELoader();
rgbeLoader.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/qwantani_moon_noon_1k.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding; // For HDRI or other textures
    scene.environment = texture;
    // scene.background = texture;

    // Add a GLTF Model
    const loader = new GLTFLoader();
    loader.load("/scene.gltf", (gltf) => {
        model = gltf.scene;
        model.scale.set(10, 10, 10);
        model.position.y = -9.5;
        scene.add(model);
    }, undefined, (error) => {
        console.error("An error occurred while loading the model:", error);
    });
});

// Post-Processing Setup
const composer = new EffectComposer(renderer);

// RenderPass: Renders the scene and camera
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// RGBShiftShader Pass: Adds the RGB shift effect
const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms["amount"].value = 0.001;
// composer.addPass(rgbShiftPass);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);  
    composer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
    window.requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Render with post-processing
    composer.render();
}

animate();