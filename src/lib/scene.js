import * as THREE from "three";
import { PointerLockControls } from "./control/PointerLockControls";
import scene from "./scene";

var OrbitControls = require("three-orbit-controls")(THREE);

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.controls = new PointerLockControls(this.camera);

    window.addEventListener(
      "click",
      event => {
        this.controls.lock();
      },
      false
    );

    this.updatefunc = null;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.activeObject = null;
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("mousemove", this.onMouseMove, false);
  }

  appendObject(object) {
    this.scene.add(object);
  }

  onMouseMove(e) {
    this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  getintersect() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      if (this.activeObject != null) {
        // this.activeObject.material.color.set(0xffff10);
      }
      this.activeObject = intersects[0].object;
      //   this.activeObject.material.color.set(0xff0000);
    } else {
      if (this.activeObject != null) {
        // this.activeObject.material.color.set(0xffff10);

        this.activeObject = null;
      }
    }

    return intersects;
  }
}

export default Scene;
