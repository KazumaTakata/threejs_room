import * as THREE from "three";

import {
  createCube,
  createPlane,
  createWall,
  addvertex,
} from "./lib/createcube";
import Scene from "./lib/scene";
var OBJLoader = require("three-obj-loader");
OBJLoader(THREE);

let scene = new Scene();

let cube = createCube();
let cube1 = createCube();

let ground = createPlane();

let wall1 = createWall({ x: 0, y: 0, z: 10 }, { x: 0, y: 0, z: 0 });
let wall2 = createWall({ x: 0, y: 0, z: -10 }, { x: 0, y: 0, z: 0 });
let wall3 = createWall({ x: 10, y: 0, z: 0 }, { x: 0, y: Math.PI / 2, z: 0 });
let wall4 = createWall({ x: -10, y: 0, z: 0 }, { x: 0, y: Math.PI / 2, z: 0 });
let vertext = addvertex();
cube1.position.y = 3;

let light = new THREE.AmbientLight(0xffffff);

var pointlight = new THREE.PointLight(0xffffff, 1, 100);
pointlight.position.set(0, 50, 0);
scene.appendObject(pointlight);

scene.appendObject(light);

scene.appendObject(ground);

scene.appendObject(wall1);
scene.appendObject(wall2);
scene.appendObject(wall3);
scene.appendObject(wall4);

scene.scene.add(scene.controls.getObject());
scene.controls.getObject().position.y = 5;

scene.appendObject(vertext);

scene.scene.background = new THREE.Color(0xffffff);
// scene.camera.position.z = 3;
// scene.camera.position.y = -3;
// scene.camera.position.x = 10;

let update = function() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  scene.controls.update(scene.scene.children);

  let intersect = scene.getintersect();
};

function animate() {
  requestAnimationFrame(animate);
  update();
  scene.renderer.render(scene.scene, scene.camera);
}

var loader = new THREE.ObjectLoader();

animate();
